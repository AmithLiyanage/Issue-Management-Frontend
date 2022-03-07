import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
  
export default function Footer () {
  return (
    <Box>
      <h1 style={{ color: "skyblue", 
                   textAlign: "center", 
                   marginTop: "-50px",
                   marginRight: "400px" }}>
        Issue Managemeent System
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Sri Lanka</FooterLink>
            <FooterLink href="#">USA</FooterLink>
          </Column>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
          </Column>
          <Column>
            <Heading>FAQ</Heading>
            <FooterLink href="#">Writing</FooterLink>
            <FooterLink href="#">Teaching</FooterLink>
          </Column>
          {/* <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column> */}
        </Row>
      </Container>
    </Box>
  );
};