describe('화면 테스트', () => {

  describe('메인 화면 테스트', () => {
    it('APP이 정상적으로 로드된다.', () => {
      cy.react('App').should('be.visible');
    });

    it('레이아웃이 정상적으로 로드된다.', () => {
      cy.react('Main').should('be.visible');
    });
  });

  describe('메뉴 테스트', () => {
    it('메뉴 영역이 정상적으로 표시된다.', () => {
      cy.react('Sider').should('be.visible');
    });

    it('메뉴들이 정상적으로 보인다.', () => {
      cy.react('Sider').react('Item').should('be.visible');
    });

    describe('메뉴 이동 테스트', () => {
      it('게시판 클릭시 정상적으로 이동한다.', () => {
        cy.react('Link', {props: {to: 'boards'}}).click().then(() => {
          cy.url().should('eq', 'http://localhost:3000/boards');
        });
      });
      it('공지사항 클릭시 정상적으로 이동한다.', () => {
        cy.react('Link', {props: {to: 'notices'}}).click().then(() => {
          cy.url().should('eq', 'http://localhost:3000/notices');
        });
      });
    });
  });
});
