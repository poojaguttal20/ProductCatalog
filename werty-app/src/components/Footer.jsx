import './Footer.css';
export default function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-light" style={{position: 'fixed', bottom: 0, width:'100%', zIndex:1000}}>
      <div className="container" style={{textAlign:'center'}}>
        <span className="text-muted footer-text" >
          &copy; {new Date().getFullYear()} Werty
        </span>
      </div>
    </footer>
  );
}
