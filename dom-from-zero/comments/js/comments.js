'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = list.map(createComment).forEach(c => {
    commentsContainer.appendChild(c);
  });
  // commentsContainer.innerHTML += comments;
}

function createNode(el) {
  const tag = el.tag === undefined ? 'div' : el.tag;
  const node = document.createElement(tag);
  
  Object.entries(el.attrs).forEach((v,k) => {
    node[v[0]] = v[1];

  });

  if (el.children !== undefined) {
    el.children.forEach(child => {
      const childNode = createNode(child);
      node.appendChild(childNode);
    });
  }

  if (el.textContent !== undefined) {
    el.textContent.split('\n').forEach((str, idx) => {
      if (idx) {
        node.appendChild(document.createElement('br'));
      }
      const text = document.createTextNode(str);
      node.appendChild(text);
    })
  }

  return node;
}

function createComment(comment) {
  const template = {
      attrs: {
        className: 'comment-wrap'
      },
      children: [
        {
          attrs: {
            className: 'photo',
            title: comment.author.name,
          },
          children: [
            {
              attrs: {
                className: 'avatar',
                style: `background-image: url('${comment.author.pic}')`
              }
            }
          ]
        },
        {
          attrs: {
            className: 'comment-block',
          },
          children: [
            {
              tag: 'p',
              attrs: {
                className: 'comment-text',
              },
                textContent: comment.text

            },
            {
              attrs: {
                className: 'bottom-comment', 
              },
              children: [
                {
                  attrs: {
                    className: 'comment-date',
                  },
                  textContent: new Date(comment.date).toLocaleString('ru-Ru') 
                },
                {
                  tag: 'ul',
                  attrs: {
                    className: 'comment-actions',  
                  },
                  children: [
                    {
                      tag: 'li',
                      attrs: {
                        className: 'complain',
                      },
                      textContent: 'Пожаловаться'
                    },
                    {
                      tag: 'li',
                      attrs: {
                        className: 'reply',
                      },
                      textContent: 'Ответить'  
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  
  return createNode(template);
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
