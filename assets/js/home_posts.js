{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(response){
                    
                     let newPost = newPostDom(response.data.post);
                     $('#posts-list-container>ul').prepend(newPost);
                     //deletePost($(' .delete-post-button', newPost));   
                    },
                error: function(err){
                    console.log("Error",err);
                }
            })
        })
    }


    //method to create a post in DOM
    let newPostDom = function(post) {
        return $(`<li id="post-${post._id}">
        <p>
            
            <small>
            <button onclick="destroyPost(this)" post-id="${post._id}">Delete</button>
            </small>
            
            <li>
                ${ post.content }
            </li>
            <small>
                ${ post.user.name }
            </small>
        </p>
    
    <div class="post-comments">
        
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Type here to add comment..." required>
                <input type="hidden" name="post" value= "${ post._id }" >
                <input type="submit" value="Add Comment">
            </form>
        
        <div class="post-comments-list">
            <ul id="post-comments-${ post._id}  %>">
                
            </ul>
    
        </div>
    </div></li>`);
    }

    //method to delete a post from dom
    let deletePost = function(deleteLink){
        console.log(deleteLink);
        $(deleteLink).click(function(e){
            e.preventDefault();
            alert("clicked");
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(response){
                   $(`#post-${resposne.data.post_id}`).remove(); 
                },
                error: function(err) {
                    console.log(error.responseText);
                }
            })
        })
    }

    let destroyPost = function(ref){
        let post_id = ref.getAttribute('post-id');
        $.ajax({
            type:'get',
            url: 'posts/destroy/'+post_id,
            success: function(response){
                console.log(response.data.post_id);
               $(`#post-${response.data.post_id}`).remove(); 
            },
            error: function(err) {
                console.log(error.responseText);
            }
        })
    }

    createPost();
}