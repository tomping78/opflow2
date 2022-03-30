import React from 'react';
import './page.css';
import { RecoilRoot } from 'recoil';

const Recoil = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <article>
        <section>
          <h2>Recoil</h2>
          {children}
        </section>
      </article>
    </RecoilRoot>
  );
};

export default Recoil;
