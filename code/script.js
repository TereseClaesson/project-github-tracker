const userProfile = document.getElementById('profile')


const username = "TereseClaesson";
//let reponame = ''

//All my repos from github
const API_USER = `https://api.github.com/users/${username}`
const API_URL = `https://api.github.com/users/${username}/repos`
//const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`



const userInfo = () => {
    fetch(API_USER)
    .then((res) => res.json())
    .then(profile => {
        userProfile.innerHTML += `
        <img src = ${profile.avatar_url}>
        <h3>${profile.name}</h3>
        `
    }) 
}


fetch(API_URL)
  .then((Response) => Response.json())
  .then((repos) => {
    console.log(repos);

    //Use the array method Filter() to filter the array and create a new array,
    //with the object properties that has been forked from Technigo
    //repos is the name of the array, repo is the name of every object in the array
    //fork is the keyname of the property, true is the keyvalue that the new arrays properties has
    //const repoForked = repos.filter(repoFork => repoFork.fork === true)

    const repoForked = repos.filter(
      (repo) => repo.fork && repo.name.startsWith("project-"));
    console.log(repoForked);
    getPullRequest(repoForked);

    /*reponame = repos.name
console.log(reponame)*/

    // declare after the data(repos in the case) been fetch, calling the const fetch on the top
    /*const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame/pulls`

fetch(API_URL_PR)
.then(Response => Response.json())
.then(repos => {
console.log(repos)


})*/
  });

const getPullRequest = (repoForked) => {
  repoForked.forEach((repo) => {
    fetch('https://api.github.com/repos/Technigo/' + repo.name + '/pulls')
      .then((res) => res.json())
      .then((pullreqs) => {
        //console.log(pullreqs)
        pullreqs.forEach((pull) => {
          if (pull.user.login === username) {
            console.log(pull);
            comments(pull);
            commits(pull);
          }
        });
      });
  });
};

const comments = (pullReq) => {
     fetch(pullReq.review_comments_url)
      .then((res) => res.json())
      .then((commentrev) => {
        console.log(commentrev)
    })
}

const commits = (pullReq) => {
    fetch(pullReq.commits_url)
    .then((res) => res.json())
    .then((commitNumber)=> {
        console.log(commitNumber)
    })
}

userInfo()