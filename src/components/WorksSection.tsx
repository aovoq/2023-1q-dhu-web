'use client'
import styled from 'styled-components'

const Section = styled.section`
   background: var(--background);
   padding-inline: 20px;
   color: #323232;
`

const Container = styled.div`
   background: #f9f7f4;
   border-radius: 20px;
   padding-block: calc(8px * 22);
`

const Wrapper = styled.div`
   width: calc(100% - 150px * 2);
   margin-inline: auto;
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
`
const WorkListItemYear = styled.span`
   font-size: 18px;
   letter-spacing: 0.05em;
`
const WorkListItemAuthor = styled.span`
   font-size: 48px;
   letter-spacing: -0.055em;
   font-weight: 900;
   color: #686868;
   line-height: 1;
   text-align: right;
   flex-grow: 1;
   `
const WorkListItemTitle = styled.span`
   font-size: 48px;
   letter-spacing: -0.055em;
   font-weight: 900;
   color: #686868;
   line-height: 1;
   text-align: right;
   flex-grow: 1;
`

const WorksSection = () => {
   return (
      <Section>
         <Container>
            <Wrapper>
               <SectionTitle>STUDENT WORKS</SectionTitle>
               <SectionSubTitle>学生達の作品</SectionSubTitle>
               <WorkList>
                  {[...Array(8)].map((_, i) => (
                     <WorkListItem key={i}>
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
