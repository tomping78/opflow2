import React from 'react';
import './page.css';

const Recoil = ({ children }: { children: React.ReactNode }) => {
  return (
    <article>
      <section>
        <h2>Recoil</h2>
        {children}
      </section>
    </article>
  );
};

export default Recoil;
