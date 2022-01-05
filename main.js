// $(document).ready(function () 
//   {
    // Validate Name
    $('#usercheck').hide();
    $('#dobcheck').hide();
    $('#emailcheck').hide();
    $('#qualcheck').hide();
    var nameError = true;
    var emailError = true;
    var dobError = true;
    var qualError = true;
    $('#name').keyup(function () {validateName();});
    
    function validateName() 
    {
      let Name = $('#name').val();
      if (Name.length == ' ') 
      {
        $('#usercheck').show();
          nameError = false;
          return false;
      }
      else if((Name.length < 3)||(Name.length > 30)) 
      {
        $('#usercheck').show();
        $('#usercheck').html("**length of username must be between 3 and 30");
        nameError = false;
        return false;
      }
      else 
      {
        $('#usercheck').hide();
        nameError = true;
        return true;
      }
   	} 
    //  Validate DOB
    function validateDOB()
    {
      var DOB = document.getElementById("dob").value;
      var d = DOB.split("-");
      var date = new Date(d[0],d[1],d[2]);
      var minDate = new Date;
      minDate.setFullYear(minDate.getFullYear() - 18);
      if(DOB == '')
      {
        $('#dobcheck').show();
        $('#dobcheck').html("**Choose a date");
        dobError=false;
        return false;
      }
      else if (date > minDate) 
      {
        $('#dobcheck').show();
        dobError=false;
        return false;
      }
      else
      {
        dobError=true;
        return true;
      }
    }
     // Validate Email
    function validateEmail()
     { 
      var email =document.getElementById('email').value;
    
      // email.addEventListener('blur', ()=>
      // {
        if(email == '')
        {
          $("#emailcheck").show();
          $('#emailcheck').html("**Email can not be empty !");
          emailError = false;
          return false;
        }
        else
        {
          emailError = true;
          return true;
        }
      }
      // )};
      // Validate Qulaification
      function validateQual()
      {
        var qual=document.getElementById("qual").value;
        if(qual == "Select")
        {
          $("#qualcheck").show();
          qualError=false;
          return false;
        }
        else
        {
          qualError=true;
          return true;
        }
      }

    
      // Submit button
	$('#submitbtn').click(function () 
    {
        validateName();  
        validateDOB();
        validateEmail();
        validateQual();
		    if((nameError == true) && (dobError == true) && (emailError == true) && (qualError == true)) 
        {
            var selectedRow=null;
            var formData = readFormData();
            if(selectedRow === null)
            {
              console.log("insert");
                insertNewRecord(formData);
            }
            else
            {
              console.log("update");
                updateRecord(formData);
            }
            resetForm();
			      return true;
		    } 
        else 
        {
			      return false;
		    }});
  // });
       //Retrieve Data
       function readFormData()
       {
           var formData = {};
           formData["name"] = document.getElementById("name").value;
           formData["dob"] = document.getElementById("dob").value;
           formData["gender"] = document.getElementById("gender").value;
           formData["qual"] = document.getElementById("qual").value;
           formData["email"] = document.getElementById("email").value;
           return formData;
       }
     //   Insert Data
       function insertNewRecord(data)
       {
         var table = document.getElementById("detailstable").getElementsByTagName('tbody')[0];
         var newRow = table.insertRow(table.length);
         var cell1 = newRow.insertCell(0);
             cell1.innerHTML = data.name;
         var cell2 = newRow.insertCell(1);
             cell2.innerHTML = data.dob;
         var cell3 = newRow.insertCell(2);
             cell3.innerHTML = data.gender;
         var cell4 = newRow.insertCell(3);
             cell4.innerHTML = data.qual;
         var cell5 = newRow.insertCell(4);
             cell5.innerHTML = data.email;
         var cell6 = newRow.insertCell(5);
             cell6.innerHTML = `<button class='btn-primary' onClick='onEdit(this)'>Edit</button> <button class='btn-danger' onClick='onDelete(this)'>Delete</button>`;
     }
     //Edit the data
     function onEdit(td){
         selectedRow = td.parentElement.parentElement;
         document.getElementById('name').value = selectedRow.cells[0].innerHTML;
         document.getElementById('dob').value = selectedRow.cells[1].innerHTML;
         document.getElementById('gender').value = selectedRow.cells[2].innerHTML;
         document.getElementById('qual').value = selectedRow.cells[3].innerHTML;
         document.getElementById('email').value = selectedRow.cells[4].innerHTML;
     }
 
     function updateRecord(formData){
         selectedRow.cells[0].innerHTML = formData.name;
         selectedRow.cells[1].innerHTML = formData.dob;
         selectedRow.cells[2].innerHTML = formData.gender;
         selectedRow.cells[3].innerHTML = formData.qual;
         selectedRow.cells[4].innerHTML = formData.email;
     }
 
     //Delete the data
     function onDelete(td){
         if(confirm('Do you want to delete this record?')){
             row = td.parentElement.parentElement;
             document.getElementById('detailstable').deleteRow(row.rowIndex);
         }
         resetForm();
     }
 
     //Reset the data
     function resetForm(){
         document.getElementById('name').value = '';
         document.getElementById('dob').value = '';
         document.getElementById('gender').value = '';
         document.getElementById('qual').value = '';
         document.getElementById('email').value = '';
     }
