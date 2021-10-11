{
  'use strict';

  const titleClickHandler = function(event){

    event.preventDefault();

    const clickedElement = this;

    console.log('Link was clicked!');

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector', articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('targetArticle', targetArticle);

  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagListSelector = '.tags.list';



  const generateTitleLinks = function(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('optArticleSelector', optArticleSelector);
    console.log('customSelector', customSelector);

    let html = '';

    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('id');

      console.log(articleId);

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;

    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);


    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();

  function generateTags(){
      /* [NEW] create a new variable allTags with an empty array */
    let allTags = [];
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log(tagsWrapper);

      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(tagHTML);
        /* add generated code to html variable */
        html = html + tagHTML + ' ';

        /* [NEW] check if this link is NOT already in allTags */
        if(allTags.indexOf(tagHTML) == -1){
        /* [NEW] add generated code to allTags array */
          allTags.push(tagHTML);
        }

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');

  }
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-','');
    /* find all tag links with class active */
    const activeTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]')

    /* START LOOP: for each active tag link */
    for(let activeTagsLink of activeTagsLinks){
      /* remove class active */
      activeTagsLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefAttributeLinks = document.querySelectorAll('a[href="' + href + '"]')
    /* START LOOP: for each found tag link */
    for(let hrefAttributeLink of hrefAttributeLinks){
      /* add class active */
      hrefAttributeLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]')
    /* START LOOP: for each link */
    for(let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  function generateAuthors(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log(authorWrapper);

      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleAuthor = article.getAttribute('data-author');

      /* generate HTML of the link */
      const authorHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
      console.log(authorHTML);
      /* add generated code to html variable */
      html = html + authorHTML;

      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }
  }
  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-','');
    /* find all tag links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]')

    /* START LOOP: for each active tag link */
    for(let activeAuthorLink of activeAuthorLinks){
      /* remove class active */
      activeAuthorLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefAttributeLinks = document.querySelectorAll('a[href="' + href + '"]')
    /* START LOOP: for each found tag link */
    for(let hrefAttributeLink of hrefAttributeLinks){
      /* add class active */
      hrefAttributeLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };

  function addClickListenersToAuthors(){
    /* find all links to authors */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]')
    /* START LOOP: for each link */
    for(let authorLink of authorLinks){
      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();
}
