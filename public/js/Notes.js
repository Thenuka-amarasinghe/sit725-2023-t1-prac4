/* This adds html eliments and dispalying the exsting notes with given variables */
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = 
            '<div class="col s12">'+
                '<div class="card card-size">'+
		            '<div class="card-content center-align">'+
    			        '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right"></i></span></div>'+
			        '<div class="card-reveal card-size">'+
                    	'<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
					    '<p>'+item.description+'</p></div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

/* Submitting form with data */
const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.description = $('#description').val().replace(/\n/g, '<br>');
    console.log(formData);
    postNotes(formData);
}

/* Posting notes to the MongoDB */
function postNotes(Notes){
    $.ajax({
        url:'/api/Notes',
        type:'POST',
        data:Notes,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('Note added successfully');
            }
        }
    });
}

/* Getting all notes from the DB */
function getAllNotes(){
    $.get('/api/Notes', (response)=>{
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

/* Defining commands to run*/
$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllNotes();
});