// components/Footer.tsx

const Footer = () => {
  return (
    <footer className="flex justify-center mt-5">
      &copy; {new Date().getFullYear()} ScrapeLab
    </footer>
  );
};

export { Footer };
