<template>
  <div class="sticky">
    <footer class="bottom">
      <div class="content">
        <section class="information">
          <h2><i class="material-icons">link</i></h2>
          <span>Snelle links</span>
          <ul>
            <li>
              <nuxt-link to="/" class="border-animation">
                <div class="inner">
                  Home
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/privacy" class="border-animation">
                <div class="inner">
                  Privacy Policy
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/algemene-voorwaarden" class="border-animation">
                <div class="inner">
                  Algemene Voorwaarden
                </div>
              </nuxt-link>
            </li>
          </ul>
        </section>
        <section class="social">
          <h2><i class="material-icons">public</i></h2>
          <span>Social media</span>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/wim-de-ruiter-886a6188/">
                <img src="/img/linkedin.png" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/WR-Automaten-347758621904825/">
                <img src="/img/facebook.png" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sticky {
  margin-top: auto;
  .bottom {
    clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);
    //background: #1a1c33;
    background: $primary-color;
    border-radius: 0 0 $border-radius $border-radius;
    padding: 18rem 0;
    margin-top: 10rem;
    .content {
      color: #fff;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 0 10rem;
      margin-top: 4rem;
      grid-gap: 10rem;
      h2 {
        text-align: center;
        i {
          font-size: 7.2rem;
        }
      }
      span {
        text-align: center;
        display: block;
        font-size: 2rem;
        margin-top: 1rem;
      }
      ul {
        list-style-type: none;
        display: flex;
        justify-content: center;
        margin-top: 6rem;
        li {
          margin: 0 2rem;
          height: 3.6rem;
          display: flex;
          a {
            display: block;
            align-self: center;
            font-size: 1.6rem;
            img {
              width: 3.6rem;
              transition: transform 0.2s;
              &:hover {
                transform: scale(1.2);
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .sticky {
    .bottom {
      clip-path: none;
      padding: 1rem 0 10rem;
      .content {
        padding: 0;
        .information {
          ul {
            flex-direction: column;
            margin-top: 3rem;
            li {
              margin: 1rem 0;
              a {
                display: block;
                margin: 0 auto;
              }
            }
          }
        }
      }
    }
  }
}

@media screen AND (max-width: 769px) {
  .sticky {
    .bottom {
      .content {
        grid-template-columns: 1fr;
      }
    }
  }
}

// Animations
.border-animation {
  --border-width: 0.1rem;
  --animation-speed: 0.5s;
  --color: #ffffff;
  color: var(--color);
  position: relative;
  display: inline-block;
  font-size: 4em;
  line-height: 1em;
  transform: scale(1, 0.8);
  border: var(--border-width) solid transparent;
  .inner {
    position: relative;
    display: inline-block;
    width: 100%;
    font-family: 'Six Caps', sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    padding: 1.3rem 1rem 1rem 1rem;
    background: #7c0000;
    z-index: 1;
    border: solid var(--border-width) transparent;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    background: var(--color);
  }

  &:focus:before,
  &:hover:before {
    animation: beforeBorders var(--animation-speed) forwards ease-in-out;
  }

  &:focus:after,
  &:hover:after {
    animation: afterBorders var(--animation-speed) forwards ease-in-out;
  }

  &:focus,
  &:hover {
    animation: borderColors var(--animation-speed) steps(1) forwards;
    outline: none;

    .border-animation__inner {
      animation: background calc(var(--animation-speed) / 5 * 3) forwards ease-in-out;
      animation-delay: calc(var(--animation-speed) / 5 * 2);
    }
  }
}

@keyframes beforeBorders {
  0% {
    top: calc(var(--border-width) * -1);
    left: 50%;
    bottom: auto;
    right: auto;
    width: 0;
    height: var(--border-width);
  }
  33% {
    top: calc(var(--border-width) * -1);
    left: calc(var(--border-width) * -1);
    bottom: auto;
    right: auto;
    width: calc(var(--border-width) + 50%);
    height: var(--border-width);
  }
  66% {
    top: calc(var(--border-width) * -1);
    left: calc(var(--border-width) * -1);
    bottom: auto;
    right: auto;
    width: var(--border-width);
    height: calc((var(--border-width) * 2) + 100%);
  }
  100% {
    top: auto;
    left: calc(var(--border-width) * -1);
    bottom: calc(var(--border-width) * -1);
    right: auto;
    width: calc(var(--border-width) + 50%);
    height: calc((var(--border-width) * 2) + 100%);
  }
}

@keyframes afterBorders {
  0% {
    top: calc(var(--border-width) * -1);
    left: auto;
    bottom: auto;
    right: 50%;
    width: 0;
    height: var(--border-width);
  }
  33% {
    top: calc(var(--border-width) * -1);
    left: auto;
    bottom: auto;
    right: calc(var(--border-width) * -1);
    width: calc(var(--border-width) + 50%);
    height: var(--border-width);
  }
  66% {
    top: calc(var(--border-width) * -1);
    left: auto;
    bottom: auto;
    right: calc(var(--border-width) * -1);
    width: var(--border-width);
    height: calc((var(--border-width) * 2) + 100%);
  }
  100% {
    top: auto;
    left: auto;
    bottom: calc(var(--border-width) * -1);
    right: calc(var(--border-width) * -1);
    width: calc(var(--border-width) + 50%);
    height: calc((var(--border-width) * 2) + 100%);
  }
}

@keyframes borderColors {
  0% {
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
  33% {
    border-top-color: var(--color);
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
  66% {
    border-top-color: var(--color);
    border-right-color: var(--color);
    border-bottom-color: transparent;
    border-left-color: var(--color);
  }
  100% {
    border-top-color: var(--color);
    border-right-color: var(--color);
    border-bottom-color: var(--color);
    border-left-color: var(--color);
  }
}
</style>
