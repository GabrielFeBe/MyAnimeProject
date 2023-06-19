import React from 'react';
import gitHub from '../images/github-mark-white.png';
import linkedin from '../images/linkedin.png';
import instagram from '../images/insta.png';

const imageStyle = { width: '25px', height: '25px' };
export default function Footer() {
  return (
    <footer style={ { backgroundColor: 'white' } }>
      <div
        style={ { width: '1500px',
          margin: '0 auto',
          backgroundColor: 'purple',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around' } }
      >
        <section style={ { textAlign: 'center' } }>
          Esse Projeto foi feito usando uma API
          com limitações de reqisições por minuto podendo gerar
          alguns bugs,
          e limitalçoes na navegação,
          qualquer Bug ou defeito encontrado: Contatar ao email:hu3master.zord1@gmail.com,
          ou ao Discord:叶修#9594
        </section>
        <div
          style={ { display: 'flex',
            justifyContent: 'space-around',
          } }
        >

          <a
            className="HoverLinks"
            href="https://github.com/GabrielFeBe"

          >
            <img
              src={ gitHub }
              alt="github"
              style={ imageStyle }
            />
            Github
          </a>
          <a
            className="HoverLinks"
            href="https://www.linkedin.com/in/gabriel-fernandes-453813264/"

          >
            <img src={ linkedin } alt="linkedin" style={ imageStyle } />
            Linkedin

          </a>
          <a
            className="HoverLinks"
            href="https://www.instagram.com/"

          >
            <img src={ instagram } alt="insta" style={ imageStyle } />
            Instagram

          </a>
        </div>
      </div>
    </footer>
  );
}
