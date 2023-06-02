'use client'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
   position: relative;
   background: #f9f7f4;
   color: #323232;
   height: 300vh;
`

const Container = styled.div`
   padding-block: calc(8px * 13);
   min-height: 100vh;
`

const StickyTrigger = styled.div`
   position: absolute;
   height: 100vh;
`

const StickyWrapper = styled.div`
   position: relative;
   width: calc(100% - 60px * 2);
   margin-inline: auto;
   height: 100vh;
   display: grid;
   place-items: center;
   &[data-is-center='true'] {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
   }
   &[data-is-section-end='true'] {
      position: absolute;
      bottom: 0;
      left: 60px;
   }
`

const SectionHead = styled.h2`
   font-size: 24px;
   font-family: var(--font-ttcommons);
   letter-spacing: 0.05em;
   opacity: 1;
   transform: 0.3s;
   padding-inline-start: 60px;
   &[data-is-center='true'] {
      opacity: 0;
   }
`

const ImgWrapper = styled.div`
   display: grid;
   place-items: center;
   padding-block: calc(8px * 11);
   position: relative;
   img {
      position: absolute;
      opacity: 1;
      transition: 0.5s;
      &[data-hidden='true'] {
         opacity: 0;
      }
   }
`

const ProfessorProfile = styled.div`
   position: absolute;
   bottom: 10rem;
   left: 0;
   width: 350px;
   border-bottom: 1px solid rgba(0, 0, 0, 0.3);
   padding-block-end: calc(8px * 4);
`

const ScrollStatsBar = styled.div`
   position: absolute;
   bottom: -1px;
   height: 2px;
   width: 0%;
   background: #323232;
   &[data-is-section-end='true'] {
      width: 100% !important;
   }
`

const ProfessorProfileEn = styled.span`
   font-size: 16px;
   font-family: var(--font-ttcommons);
   letter-spacing: 0.08em;
`

const ProfessorProfileName = styled.h3`
   font-size: 18px;
   font-weight: 700;
   letter-spacing: 0.08em;
   margin-block-end: calc(8px * 2);
`

const ProfessorProfileBio = styled.p`
   font-size: 14px;
   line-height: 1.6;
   letter-spacing: 0.05em;
`

const ProfessorSection = () => {
   const SectionElm = useRef<HTMLDivElement>(null)
   const centerTriggerElm = useRef<HTMLDivElement>(null)
   const [isCenter, setIsCenter] = useState(false)
   const [isSectionEnd, setIsSectionEnd] = useState(false)
   const [professorPercentage, setProfessorPercentage] = useState(0)
   const [professorIndex, setProfessorIndex] = useState(0)
   const PROFESSOR_PROFILE = [
      {
         name_kana: 'クリヤ コウスケ',
         name_en: 'Kousuke Kuriya',
         bio: '中央大学卒業後、流通業に就くが、その際に「人と人とを繋ぐ」という『道具』としてのWebの魅力に触れWeb業界へ転進。Webデザインユニットの代表として、SOHOでWebの企画・デザイン・サイト運営等を手掛けながら、各地でWeb関連の講師を担当。その後、デジタルハリウッドに所属する。',
         imgPath: '/teacher_kuriya.png',
         imgDeg: '0',
      },
      {
         name_kana: 'コマツ サトシ',
         name_en: 'Satoshi Komatsu',
         bio: '東京工芸大学　工学部画像工学科卒業。セキリュリティ機器メーカーで開発部に携わる。3年後退社し、デジタルハリウッドで半年間学ぶ。卒業後はアルバイトを経てフリーランスになり、映像やWebサイト制作、CD-ROM制作などを手がけるオーサリングエンジニア。Macromedia認定インストラクター。',
         imgPath: '/teacher_komatsu.png',
         imgDeg: '6',
      },
      {
         name_kana: 'ハマダ ショウゴ',
         name_en: 'Shougo Hamada',
         bio: '会津大学コンピュータ理工学部ソフトウェア学科卒業。大学卒業後は上場コンサル系SIerに努め、大規模案件を数々経験する。後にマウントポジション創業メンバーとして参加。座右の銘は「質には量」でコードを量産する日々。もっぱら、Objective-C、Ruby、JavaScriptなどを利用。サッカー、フットサルが趣味。',
         imgPath: '/teacher_hamada.png',
         imgDeg: '-9.8',
      },
   ]
   const PROFESSOR_PROFILE_REVERSE = [...PROFESSOR_PROFILE].reverse()

   useEffect(() => {
      const getScrollState = () => {
         if (!centerTriggerElm.current || !SectionElm.current) return
         const scroll = window.scrollY
         const SectionElmHeight = SectionElm.current.getBoundingClientRect().height
         const SectionElmTop = SectionElm.current.getBoundingClientRect().top + window.pageYOffset
         console.log(scroll - SectionElmTop, SectionElmHeight - window.innerHeight)
         const scrollNum =  scroll - SectionElmTop
         const scrollMaxNum = SectionElmHeight - window.innerHeight
         const sectionPercentage = scrollNum / scrollMaxNum * 100
         const oneProfessorRawPercentage = sectionPercentage / (100 / PROFESSOR_PROFILE.length)
         const professorIndex = Math.floor(oneProfessorRawPercentage)
         const oneProfessorPercentage = (oneProfessorRawPercentage - Math.floor(oneProfessorRawPercentage)) * 100
         if (sectionPercentage > 0 && professorIndex < PROFESSOR_PROFILE.length) {
            setProfessorIndex(professorIndex)
            setProfessorPercentage(oneProfessorPercentage)
         }

         const centerTriggerElmHeight = centerTriggerElm.current?.getBoundingClientRect().height
         const centerTriggerElmTop = centerTriggerElm.current?.getBoundingClientRect().top + window.pageYOffset
         const centerTriggerElmCenter = centerTriggerElmTop + centerTriggerElmHeight / 2


         if (scroll < centerTriggerElmCenter - window.innerHeight / 2) {
            setIsCenter(false)
         } else if (SectionElmHeight - window.innerHeight <= scroll - SectionElmTop) {
            setIsCenter(false)
            setIsSectionEnd(true)
         } else {
            setIsCenter(true)
            setIsSectionEnd(false)
         }
      }
      window.addEventListener('scroll', getScrollState)
      return () => {
         window.removeEventListener('scroll', getScrollState)
      }
   }, [])

   // useEffect(() => {
   //    if (isCenter) {

   //    }
   // }, [isCenter])

   return (
      <Section ref={SectionElm}>
         <Container>
            <SectionHead data-is-center={isCenter}>PROFESSOR</SectionHead>
            <StickyTrigger ref={centerTriggerElm} />
            <StickyWrapper data-is-center={isCenter} data-is-section-end={isSectionEnd}>
               <ImgWrapper>
                  {PROFESSOR_PROFILE_REVERSE.map((profile, idx) => (
                     <img
                        src={profile.imgPath}
                        alt=''
                        style={{ transform: `rotate(${profile.imgDeg}deg)` }}
                        data-hidden={professorIndex > PROFESSOR_PROFILE.length - 1 - idx}
                        key={profile.name_en}
                     />
                  ))}
               </ImgWrapper>
               <ProfessorProfile>
                  <ProfessorProfileEn>{PROFESSOR_PROFILE[professorIndex].name_en}</ProfessorProfileEn>
                  <ProfessorProfileName>{PROFESSOR_PROFILE[professorIndex].name_kana}</ProfessorProfileName>
                  <ProfessorProfileBio>{PROFESSOR_PROFILE[professorIndex].bio}</ProfessorProfileBio>
                  <ScrollStatsBar style={{width: `${professorPercentage}%`}} data-is-section-end={isSectionEnd} />
               </ProfessorProfile>
            </StickyWrapper>
         </Container>
      </Section>
   )
}

export default ProfessorSection
