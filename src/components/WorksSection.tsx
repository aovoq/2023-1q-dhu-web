'use client'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
   background: var(--background);
   padding-inline: 20px;
   color: #323232;
   position: relative;
`

const Container = styled.div`
   background: #f9f7f4;
   border-radius: 20px;
   padding-block: calc(8px * 22);
   @media (max-width: 768px) {
      padding-block: calc(8px * 12);
   }
`

const Wrapper = styled.div`
   width: calc(100% - 150px * 2);
   margin-inline: auto;
   @media (max-width :768px) {
      width: calc(100% - 20px * 2);
   }
`

const SectionTitle = styled.h2`
   font-size: 24px;
   letter-spacing: 0.05em;
   font-weight: 400;
   font-family: var(--font-ttcommons);
   margin-block-end: calc(8px * 3);
`

const SectionSubTitle = styled.p`
   font-size: 16px;
   letter-spacing: 0.05em;
   margin-block-end: calc(8px * 6);
`

const WorkList = styled.ul`
   list-style: none;
`
const WorkListItem = styled.li`
   border-block-start: 1px solid rgba(0, 0, 0, 0.3);
   padding-block: calc(8px * 3);
   display: flex;
   align-items: flex-start;
   padding-inline-end: calc(8px * 5);
   &:last-child {
      border-block-end: 1px solid rgba(0, 0, 0, 0.3);
   }
   @media (max-width: 768px) {
      padding-inline-end: 0;
      flex-wrap: wrap;
   }
`
const WorkListItemYear = styled.span`
   font-size: 18px;
   letter-spacing: 0.05em;
   @media (max-width: 768px) {
      font-size: 14px;
   }
`
const WorkListItemAuthor = styled.span`
   font-size: 48px;
   letter-spacing: -0.055em;
   font-weight: 900;
   color: #686868;
   line-height: 1;
   text-align: right;
   flex-grow: 1;
   @media (max-width: 768px) {
      font-size: 28px;
   }
   `
const WorkListItemTitle = styled.span`
   font-size: 48px;
   letter-spacing: -0.055em;
   font-weight: 900;
   color: #686868;
   line-height: 1;
   text-align: right;
   flex-grow: 1;
   @media (max-width: 768px) {
      font-size: 28px;
   }
`

const CursorStoker = styled.div`
   position: absolute;
   opacity: 0;
   border: 12px solid #686868;
   border-radius: 8px;
`

const StokerInner = styled.div`
   background: #686868;
   img {
      border-radius: 6px;
   }
`

const WorksSection = () => {
   const stokerRef = useRef<HTMLDivElement>(null)
   const [onEnter, setOnEnter] = useState(false)
   const sectionRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const onMouseMove = (event: MouseEvent) => {
         const stoker = stokerRef.current
         if (stoker) {
            console.log(event.clientX, event.clientY)
            // stoker.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
            stoker.style.top = `${event.clientY}px`
            stoker.style.left = `${event.clientX}px`
         }
      }
      window.addEventListener('mousemove', onMouseMove)
      return () => {
         window.removeEventListener('mousemove', onMouseMove)
      }
   }, [])

   const onMouseEnter = () => {
      const stoker = stokerRef.current
      if (stoker) {
         stoker.style.opacity = '1'
         setOnEnter(true)
      }
   }

   const onMouseLeave = () => {
      const stoker = stokerRef.current
      if (stoker) {
         stoker.style.opacity = '0'
         setOnEnter(false)
      }
   }

   return (
      <Section ref={sectionRef}>
         <CursorStoker ref={stokerRef}>
            <StokerInner>
            <img src="/work1.png" />
            </StokerInner>
         </CursorStoker>
         <Container>
            <Wrapper>
               <SectionTitle>STUDENT WORKS</SectionTitle>
               <SectionSubTitle>学生達の作品</SectionSubTitle>
               <WorkList>
                  {[...Array(8)].map((_, i) => (
                     <WorkListItem key={i} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <WorkListItemYear>2020</WorkListItemYear>
                        <WorkListItemAuthor>SEKIMOTO MAKI</WorkListItemAuthor>
                        <WorkListItemTitle>IKIRAKUYOGA</WorkListItemTitle>
                     </WorkListItem>
                  ))}
               </WorkList>
            </Wrapper>
         </Container>
      </Section>
   )
}

export default WorksSection
