'use client'
import styled from "styled-components"

const Section = styled.section`
   background: var(--background);
   padding-block-end: calc(8px * 40);
`

const Article = styled.article`
   width: calc(100% - 170px * 2);
   margin-inline: auto;
   margin-block-start: calc(8px * 30);
   display: flex;
   @media (max-width: 768px) {
      width: calc(100% - 20px * 2);
      flex-direction: column;
      gap: calc(8px * 5);
   }
`

const ArticleHead = styled.div`
   width: 50%;
   flex-shrink: 0;
   font-size: 24px;
   letter-spacing: 0.05em;
   font-weight: 400;
   font-family: var(--font-ttcommons);
`

const ArticleContent = styled.div`
display: flex;
gap: calc(8px * 8);
`
const ArticleContentItem = styled.div``
const ArticleContentItemImg = styled.img`
   object-fit: cover;
   width: 276px;
   height: 491px;
   background: #D9D9D9;
`
const ArticleContentItemTitle = styled.p`
   font-size: 18px;
   letter-spacing: 0.075em;
`

const CurriculumSection = () => {
  return (
    <Section>
      <Article>
         <ArticleHead>
            <h2>CURRICULUM</h2>
         </ArticleHead>
         <ArticleContent>
            {[...Array(8)].map((_, i) => (
               <ArticleContentItem key={i}>
                  <ArticleContentItemImg src={`/CURRICULUM${i+1}.jpg`} />
                  <ArticleContentItemTitle>Webサイトプロトタイプ演習</ArticleContentItemTitle>
               </ArticleContentItem>
            ))}
         </ArticleContent>
      </Article>
    </Section>
  )
}

export default CurriculumSection
