import { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-stone-300 text-base-content p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
}
