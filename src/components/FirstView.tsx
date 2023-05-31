'use client'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

import fisheyeVertexShader from '../shader/fisheye/vertex.glsl'
import fisheyeFragmentShader from '../shader/fisheye/fragment.glsl'

const Section = styled.section`
   background: #000;
   box-shadow: 0px 44px 55px #000;
   position: relative;
   height: 100vh;
`

const Figure = styled.figure`
   display: block;
   width: 100%;
   height: 100%;
   canvas {
      position: absolute;
      width: 100%;
      left: 50%;
      transform: translateX(-50%);
   }
`

const Video = styled.video`
   display: none;
`

const Logo = styled.img`
   position: absolute;
   top: calc(8px * 3);
   left: calc(8px * 4);
`

const SiteHead = styled.h1`
   position: absolute;
   bottom: calc(8px * 3);
   left: calc(8px * 4);
   font-size: calc(8px * 12);
   font-weight: 900;
   line-height: 1.2;
   letter-spacing: 0.03em;
   white-space: nowrap;
   pointer-events: none;
   font-family: var(--font-ttcommons);
`

const FirstView = () => {
   const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
   const figureElm = useRef<HTMLCanvasElement>(null!)
   const videoElm = useRef<HTMLVideoElement>(null!)

   const changeCanvasSize = (): void => {
      const figureElmWidth = figureElm.current.clientWidth
      const figureElmHeight = figureElm.current.clientHeight
      setCanvasSize({ width: figureElmWidth, height: figureElmHeight })
   }

   useEffect(() => {
      changeCanvasSize()

      window.addEventListener('resize', changeCanvasSize)
      return () => {
         window.removeEventListener('resize', changeCanvasSize)
      }
   }, [])

   const getDistortionShaderDefination = () => {
      return {
         uniforms: {
            tDiffuse: { type: 't', value: null },
            strength: { type: 'f', value: 0 },
            height: { type: 'f', value: 1 },
            aspectRatio: { type: 'f', value: 1 },
            cylindricalRatio: { type: 'f', value: 1 },
         },
         vertexShader: fisheyeVertexShader,
         fragmentShader: fisheyeFragmentShader,
      }
   }



   const init = () => {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, canvasSize.width / canvasSize.height, 1, 1000)
      camera.position.set(0, 20, 20)
      scene.add(camera)

      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(canvasSize.width, canvasSize.height)
      renderer.setClearColor(new THREE.Color(0x000000), 1)

      window.addEventListener('resize', () => {
         camera.aspect = canvasSize.width / canvasSize.height
         camera.updateProjectionMatrix()
         renderer.setSize(canvasSize.width, canvasSize.height)
      })
   }

   const lerp = (start: number, end: number, amt: number) => {
      return (1 - amt) * start + amt * end
   }

   useEffect(() => {
      const scene = new THREE.Scene()
      const cameraConfig = {
         fov: 35,
         aspect: canvasSize.width / canvasSize.height,
         near: 1,
         far: 1000,
      }
      const camera = new THREE.PerspectiveCamera(
         cameraConfig.fov,
         cameraConfig.aspect,
         cameraConfig.near,
         cameraConfig.far,
      )
      camera.position.z = 50
      const mouse = new THREE.Vector2()

      const onMouseMove = (event: MouseEvent): void => {
         mouse.x = (event.offsetX / window.innerWidth) * 2 - 1
         mouse.y = -(event.offsetY / window.innerHeight) * 2 + 1

         const startX = camera.rotation.x
         const startY = camera.rotation.y
         const endX = mouse.y * (Math.PI / 18)
         const endY = mouse.x * (Math.PI / 18)

         Math.abs(endX - 0) < 0.13 && (camera.rotation.x = lerp(startX, endX, 0.1))
         camera.rotation.y = lerp(startY, endY, 0.1)
      }
      window.addEventListener('mousemove', onMouseMove, true)


      const renderer = new THREE.WebGLRenderer({ alpha: true })
      renderer.setSize(canvasSize.width, canvasSize.height)

      if (figureElm.current.firstChild) {
         figureElm.current.removeChild(figureElm.current.firstChild)
      }
      figureElm.current.appendChild(renderer.domElement)

      const light = new THREE.AmbientLight(0xffffff, 1)
      scene.add(light)

      const composer = new EffectComposer(renderer)
      const renderPass = new RenderPass(scene, camera)
      const shaderPass = new ShaderPass(getDistortionShaderDefination())
      composer.addPass(renderPass)
      composer.addPass(shaderPass)

      const horizontalFOV = 120
      const strength = 0.3
      const cylindricalRatio = 2.0
      const height = Math.tan(THREE.MathUtils.degToRad(horizontalFOV) / 2) / camera.aspect

      camera.fov = (Math.atan(height) * 2 * 180) / 3.1415926535
      camera.updateProjectionMatrix()

      shaderPass.uniforms['strength'].value = strength
      shaderPass.uniforms['height'].value = height
      shaderPass.uniforms['aspectRatio'].value = camera.aspect
      shaderPass.uniforms['cylindricalRatio'].value = cylindricalRatio

      const size = 300
      const divisions = 10
      const gridHelper = new THREE.GridHelper(size, divisions)
      gridHelper.rotation.x = Math.PI / 2
      // scene.add(gridHelper)

      videoElm.current.play()
      const videoGeometry = new THREE.PlaneGeometry(200, 110)
      const videoTexture = new THREE.VideoTexture(videoElm.current)
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      const videoMaterial = new THREE.MeshPhongMaterial({ map: videoTexture })
      const videoPrimitive = new THREE.Mesh(videoGeometry, videoMaterial)
      scene.add(videoPrimitive)

      // const lineGeometry = new THREE.PlaneGeometry( 2, 110 )
      // const lineMaterial = new THREE.MeshBasicMaterial( { color: 0x1b1b1b } )
      // const line = new THREE.Mesh(lineGeometry, lineMaterial)
      // scene.add(line)

      const makeInstance = (width: number, height: number, color: number, x: number, y: number) => {
         const geometry = new THREE.PlaneGeometry(width, height)
         const material = new THREE.MeshBasicMaterial({ color: 0x1a1a1a })
         console.log(color)
         const line = new THREE.Mesh(geometry, material)
         scene.add(line)
         line.position.x = x
         line.position.y = y
         line.position.z = 0.001
         return line
      }
      const lines = [
         // makeInstance(2, 110, 0x1b1b1b, 33.333, 0),
         // makeInstance(2, 110, 0x1b1b1b, -33.333, 0),
         // makeInstance(200, 2, 0x1b1b1b, 0, 18.33),
         // makeInstance(200, 2, 0x1b1b1b, 0, -18.33),
      ]

      const makeFrame = (x: number, y: number) => {
         const frame = new THREE.Shape()
         const halfWidth = 33.33
         const halfHeight = 18.33
         const innerWidth = halfWidth - 0.4
         const innerHeight = halfHeight - 0.4
         frame.moveTo(-halfWidth, -halfHeight)
         frame.lineTo(halfWidth, -halfHeight)
         frame.lineTo(halfWidth, halfHeight)
         frame.lineTo(-halfWidth, halfHeight)

         const hole = new THREE.Path()
         hole.moveTo(-innerWidth, -innerHeight)
         hole.lineTo(innerWidth, -innerHeight)
         hole.lineTo(innerWidth, innerHeight)
         hole.lineTo(-innerWidth, innerHeight)
         frame.holes.push(hole)

         const geo = new THREE.ShapeGeometry(frame)
         const mat = new THREE.MeshBasicMaterial({ color: 0x1b1b1b })
         const mesh = new THREE.Mesh(geo, mat)

         mesh.position.x = x
         mesh.position.y = y

         scene.add(mesh)

         return mesh
      }

      const frames = [
         makeFrame(-66.66, 0),
         makeFrame(0, 0),
         makeFrame(66.66, 0),
         makeFrame(-66.66, -36.66),
         makeFrame(0, -36.66),
         makeFrame(66.66, -36.66),
         makeFrame(-66.66, 36.66),
         makeFrame(0, 36.66),
         makeFrame(66.66, 36.66),
      ]

      function render() {
         composer.render()
         requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
      return () => {
         window.removeEventListener('mousemove', onMouseMove, true)
      }
   }, [canvasSize])

   return (
      <Section>
         <Video ref={videoElm} src='/fv.mp4' muted loop playsInline style={{ opacity: 0 }}></Video>
         <Figure ref={figureElm} id='canvas'></Figure>
         <div>
            <Logo src="/logo.svg"/>
            <SiteHead>Web Design<br />Web Development</SiteHead>
         </div>
      </Section>
   )
}

export default FirstView
