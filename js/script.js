{
  'use strict';

  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagListSelector: '.tags.list',
    authorsListSelector: '.authors.list',
    cloudClassCount: '5',
    cloudClassPrefix: 'tag-size-'
  };

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
  };

  const generateTitleLinks = function(customSelector = ''){
    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';
    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    let html = '';
    for(let article of articles){
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();

  const calculateTagsParams = function(tags){
    const params = {
      min: 999999,
      max: 0
    };

    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
    }
      for(let tag in tags){
        if(tags[tag] < params.min){
        params.min = tags[tag];
        }
      }
    return params;
  };

  const calculateTagClass = function (count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );
    return opt.cloudClassPrefix + classNumber;
  };

  const generateTags = function(){
    let allTags = {};
    const articles = document.querySelectorAll(opt.articleSelector);
    for(let article of articles){
      const tagsWrapper = article.querySelector(opt.articleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      articleTagsArray = articleTags.split(' ');
      for(let tag of articleTagsArray){
        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        html = html + tagHTML + ' ';
        if(!allTags[tag]){
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      tagsWrapper.innerHTML = html;
    }
    const tagList = document.querySelector(opt.tagListSelector);
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = '';
    for(let tag in allTags){
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag +'</a></li> ';
      allTagsHTML += tagLinkHTML;
    }
    tagList.innerHTML = allTagsHTML;
  }
  generateTags();

  const tagClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-','');
    const activeTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]')
    for(let activeTagsLink of activeTagsLinks){
      activeTagsLink.classList.remove('active');
    }
    const hrefAttributeLinks = document.querySelectorAll('a[href="' + href + '"]')
    for(let hrefAttributeLink of hrefAttributeLinks){
      hrefAttributeLink.classList.add('active');
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags= function(){
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]')
    for(let tagLink of tagLinks){
      tagLink.addEventListener('click', tagClickHandler);
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){
    let allAuthors = {};
    const articles = document.querySelectorAll(opt.articleSelector);
    for(let article of articles){
      const authorWrapper = article.querySelector(opt.articleAuthorSelector);
      let html = '';
      const author = article.getAttribute('data-author');
      const authorHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';
      html = html + authorHTML;
      if(!allAuthors[author]){
          allAuthors[author] = 1;
        } else {
          allAuthors[author]++;
        }
      authorWrapper.innerHTML = 'by ' + html;
    }
    const authorList = document.querySelector(opt.authorsListSelector);
    let allAuthorsHTML = '';
    for(let author in allAuthors){
      const authorLinkHTML ='<li><a href="#author-' + author + '">' + author + ' ('+ allAuthors[author] + ')</a></li> ';
      allAuthorsHTML += authorLinkHTML;
      authorList.innerHTML = allAuthorsHTML;
    }
  }

  generateAuthors();

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-','');
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]')
    for(let activeAuthorLink of activeAuthorLinks){
      activeAuthorLink.classList.remove('active');
    }
    const hrefAttributeLinks = document.querySelectorAll('a[href="' + href + '"]')
    for(let hrefAttributeLink of hrefAttributeLinks){
      hrefAttributeLink.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function(){
    const authorLinks = document.querySelectorAll('a[href^="#author-"]')
    for(let authorLink of authorLinks){
      authorLink.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();
}
