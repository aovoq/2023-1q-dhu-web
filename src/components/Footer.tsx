'use client'
import styled from 'styled-components'
import { SubtractEquation } from 'three'

const Container = styled.footer`
   height: calc(8px * 85);
   background: var(--background);
   transition: 0.3s;
   margin-block-start: 20px;
   margin-inline: 20px;
   border-radius: 20px 20px 0 0;
   :hover {
      box-shadow:0px 0px 100px 3px #66625e inset;
   }
`

const FooterLink = styled.a`
   cursor: pointer;
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: calc(8px * 5);
`

const FooterTitle = styled.span`
   font-size: 24px;
   letter-spacing: 0.05em;
   font-weight: 700;
`

const FooterMainText = styled.p`
   font-size: 48px;
   letter-spacing: 0.05em;
   font-family: var(--font-ttcommons);
`

const FooterSubText = styled.p`
   font-size: 24px;
   letter-spacing: 0.05em;
   font-weight: 700;
`

const Footer = () => {
   return (
      <Container>
         <FooterLink href='#'>
            <FooterTitle>コンタクト</FooterTitle>
            <FooterMainText>Send Email</FooterMainText>
            <FooterSubText>どうぞ、お気楽にご連絡ください</FooterSubText>
         </FooterLink>
      </Container>
   )
}

export default Footer
