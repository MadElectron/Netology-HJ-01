'use strict';

function handleTableClick(event) {

  if (event.target.classList.contains('prop__name')) {
    let dir = event.target.dataset.dir;
    const propName = event.target.dataset.propName;

    dir = dir === undefined ? 1 : -dir;
    event.target.dataset.dir = dir;
    event.currentTarget.dataset.sortBy = propName;

    sortTable(propName, dir);
  }


}
