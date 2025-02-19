function fetchPosts() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            const postsDiv = document.getElementById('posts');
            postsDiv.innerHTML = '';
            data.forEach(post => {
                postsDiv.innerHTML += `<h2>${post.title}</h2><p>${post.content}</p>`;
            });
        });
}

document.getElementById('add-post-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    fetch('/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, content}),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchPosts();
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

fetchPosts();
