$(function() {
  const getSurvey = function(event) {
    event.preventDefault();

    const radioValues = function(){
        q1 = $('input[name="q1"]:checked').val();
        q2 = $('input[name="q2"]:checked').val();
        q3 = $('input[name="q3"]:checked').val();
        q4 = $('input[name="q4"]:checked').val();
        q5 = $('input[name="q5"]:checked').val();
        q6 = $('input[name="q6"]:checked').val();
        q7 = $('input[name="q7"]:checked').val();
        q8 = $('input[name="q8"]:checked').val();
        q9 = $('input[name="q9"]:checked').val();
        q10 = $('input[name="q10"]:checked').val();
    };

    radioValues();


    const questions = {
      name: $("#name").val(),
      photo: $("#picture").val(),
      scores: [
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8,
        q9,
        q10
    ]
    };

    if ($('input:checked').length < 10){
        alert("Please complete all questions")
       
    }else{

        $.ajax({
            method: "GET",
            url: "api/employees"
          }).then(function(data) {
            let mostDif = 40;
            let sum = 0;
            let match = null;
            let img1 = new Image();
            for (let i = 0; i < data.length; i++){
                sum = 0;
                for(let j = 0; j < 10; j++){
                sum += Math.abs(parseInt(data[i].scores[j])-parseInt(questions.scores[j]));
                
            };
                if (sum < mostDif){
                    mostDif = sum;
                    match = data[i]
                    img1.src = `${data[i].photo}`;
                    img1.alt = 'Employee Image';
                    img1.height = '250'
                    $('#empImage').append(img1)
                    $('#empName').html(`${data[i].name}`)
                    $('#myModal').modal('show')
                }
            }
               
          
               $.ajax({
                method: "POST",
                url: "api/employees",
                data: questions
              });
            });
    }
  };    


//   getEmployees();

  $(".subbutton").on("click", getSurvey);
});
