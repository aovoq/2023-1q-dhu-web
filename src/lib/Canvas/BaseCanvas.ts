import Config from '@/lib/Canvas/Config'
import * as THREE from 'three'

export default class BaseCanvas {
   public scene: THREE.Scene
   public aspect: number
   public camera: THREE.PerspectiveCamera
   public renderer: THREE.WebGLRenderer
   private container: HTMLCanvasElement

   constructor(canvasElm: HTMLCanvasElement) {
      this.container = canvasElm
      this.setConfig()

      this.scene = new THREE.Scene()

      this.aspect = canvasElm.clientWidth / canvasElm.clientHeight
      this.camera = new THREE.PerspectiveCamera(100, this.aspect, 0.1, 1000)
      this.camera.position.set(0, 0, 10)

      this.renderer = new THREE.WebGLRenderer({
         canvas: canvasElm,
         alpha: false,
         antialias: false,
         depth: false,
         stencil: false,
      })

      this.renderer.setClearColor(new THREE.Color(0x000000))
      this.renderer.setSize(Config.width, Config.height)
      this.renderer.setPixelRatio(Config.dpr)
   }




   private setConfig() {
      const { width, height } = this.container.getBoundingClientRect()

      Config.dpr = Math.min(window.devicePixelRatio, 2)
      Config.width = width
      Config.height = height
      Config.halfWidth = width / 2
      Config.halfHeight = height / 2
      Config.aspectRatio = width / height
   }
}
