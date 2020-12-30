//create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefualt();
            let self  = this;

            $.ajax({
                type: 'Post',
                url: $(self).attr('href'),
            })
            .done(function(response){
                let likesCount = parseInt($(self).attr('data-likes'));
                if(response.deleted == true){
                    likesCount -= 1;
                }else{
                    likesCount += 1;
                }
                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);
            })  
            .fail(function(errResponse){
                console.log('error in completing the request');
            })
        })
    }
}