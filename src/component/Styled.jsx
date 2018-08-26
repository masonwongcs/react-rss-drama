import styled from "styled-components";
import { Range } from "immutable";
const dramaPlaceholder = require("../images/drama-placeholder.svg");
const homeIcon = require("../images/house-outline.svg");

export const AppWrapper = styled.div`
  background-color: #121212;
`;

export const DramaListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  @media screen and (max-width: 375px) {
    margin: 0 3px;
  }
  .drama-list-item {
    flex: 1 1 15%;
    height: 20vw;
    position: relative;
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    margin: 6px;
    overflow: hidden;
    &.hide {
      display: none;
    }
    @media screen and (max-width: 375px) {
      flex: 1 1 40%;
      height: 38vh;
      margin: 3px;
    }
    &:before {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 30%;
      width: 100%;
      z-index: 2;
      background: linear-gradient(to bottom, transparent 0%, #000 100%);
      transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateY(100%);
    }
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 10%;
      left: 0;
      width: 40%;
      height: 40%;
      margin: auto;
      background: url(${dramaPlaceholder}) center / contain no-repeat;
      opacity: 0.2;
    }
    &:hover {
      transform: scale(1.02);
      &:before {
        transform: translateY(0);
      }
      .drama-title {
        opacity: 1;
      }
    }
    .poster {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .drama-title {
      position: absolute;
      color: #fff;
      font-size: 14px;
      bottom: 6px;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 2;
      opacity: 0;
      transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  @keyframes fadeInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const EpisodeListWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 375px) {
    display: block;
  }
  .bg-poster {
    position: fixed;
    z-index: 0;
    opacity: 0.5;
    filter: blur(10px);
    width: 65%;
    height: 120%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    top: -10%;
    left: -10%;
    @media screen and (max-width: 375px) {
      width: 120%;
    }
    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 20%;
      height: 100%;
      background: linear-gradient(to right, transparent 0%, #121212 80%);
      @media screen and (max-width: 375px) {
        width: 100%;
        height: 80%;
        top: initial;
        left: 0;
        background: linear-gradient(to bottom, transparent 0%, #121212 80%);
      }
    }
  }
  .episode-poster {
    width: 45%;
    height: 100%;
    position: fixed;
    top: 0;
    @media screen and (max-width: 375px) {
      position: relative;
      width: 100%;
      height: 300px;
    }
    .poster {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 80%;
      height: 80%;
      margin: auto;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .drama-title {
      color: #fff;
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      bottom: 2%;
      text-align: center;
    }
  }
  .episode-list-wrapper {
    width: 40%;
    margin-left: 50%;
    padding: 5% 0;
    z-index: 2;
    @media screen and (max-width: 375px) {
      width: 100%;
      margin-left: 0;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        height: 50px;
        line-height: 50px;
        color: #fff;
        position: relative;
        &.hide {
          display: none;
        }
        a {
          text-decoration: none;
          color: #fff;
          position: absolute;
          padding: 0 50px;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transition: all 200ms ease-in-out;

          @media screen and (max-width: 375px) {
            text-align: center;
          }
          &:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
        }
        &:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
`;

export const HeaderWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 20px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 100%
  );
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    .home {
      display: block;
      font-size: 0;
      width: 35px;
      height: 35px;
      background: rgba(0, 0, 0, 0.2) url(${homeIcon}) center / 60% no-repeat;
      border-radius: 50%;
      border: 1px solid #fff;
      box-sizing: border-box;
      backdrop-filter: blur(20px);
    }
  }
`;
