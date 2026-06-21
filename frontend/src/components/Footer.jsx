const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div>
        <p className="footer__brand">PAES Mentor</p>
        <p className="footer__disclaimer">
          Plataforma educativa independiente y gratuita. No tiene afiliación
          oficial con el DEMRE ni con el Ministerio de Educación; centraliza
          y organiza material públicamente disponible para apoyar tu estudio.
        </p>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} PAES Mentor</p>
    </div>
  </footer>
);

export default Footer;
