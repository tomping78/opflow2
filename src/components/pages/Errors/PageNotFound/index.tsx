import BaseTemplate from '../../../templates/BaseTemplate';

/**
 * 페이지를 찾지 못했습니다
 *  - e.g) 404
 * @constructor
 */
const PageNotFound = () => {
  return (
    <BaseTemplate>
      <div className={'404'}>404</div>
    </BaseTemplate>
  );
};

export default PageNotFound;
