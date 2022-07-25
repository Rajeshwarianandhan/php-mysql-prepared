// show password
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
togglePassword.addEventListener("click", function (e) {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
});

// validation start

$(document).ready(function () {

    $.validator.setDefaults({
        submitHandler: function () {

        }
    });

    $.validator.addMethod(
        "regex",
        function (fname, element, regexp) {
            return this.optional(element) || regexp.test(fname);
        }
    );

    $.validator.addMethod(
        "regex",
        function (lname, element, regexp) {
            return this.optional(element) || regexp.test(lname);
        }
    );

    $.validator.addMethod(
        "regex",
        function (email, element, regexp) {
            return this.optional(element) || regexp.test(email);
        }
    );

    $("#form").validate({
        rules: {
            fname: {
                required: true,
                regex: /^[a-zA-Z]*$/,
                minlength: 3,
                maxlength: 25,
            },
            lname: {
                required: true,
                regex: /^[a-zA-Z]*$/,
                minlength: 1,
                maxlength: 10,
            },
            email: {
                required: true,
                regex: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 20
            },
            mobile: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            dob: {
                required: true,
                date: true
            }
        },

        messages: {
            fname: {
                required: "First name is must!",
                regex: "Allowed only characters!",
                minlength: "Minimum lenght is 3",
                maxlength: "Maximum length is 25",
            },
            lname: {
                required: "Last name is must!",
                regex: "Allowed only characters!",
                minlength: "Minimum lenght is 1",
                maxlength: "Maximum length is 10",
            },
            email: {
                required: "Email is must!",
                regex: "Please enter a valid email",
            },
            password: {
                required: "Password is must!",
                minlength: "Minimum length is 8",
                maxlength: "Maximum length is 20"
            },
            mobile: {
                required: "Mobile number is must!",
                digits: "Allowed only numbers!",
                minlength: "Minimum length is 10",
                maxlength: "Maximum length is 10"
            },
            dob: {
                required: "DOB is must!",
                date: "Enter correct date format"
            }

        }

    });

    // valiation ends

    // Ajax start

    $("#signup").click(function () {

        const fname = $("#fname").val();
        const lname = $("#lname").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const mobile = $("#mobile").val();
        const dob = $("#dob").val();

        if (fname == '' || lname == '' || email == '' || password == '' || mobile == '' || dob == '') {
            alert("Please fill all the fields!");
        } else {

            $.ajax({
                url: "./php/index.php",
                type: "post",
                data: $("#form").serialize(),
                dataType: "JSON",
                success: function (d) {
                    if (d.status == 'success') {
                        window.location = "login.html";
                    } else if (d.status == 'error') {
                        $("#email_msg").html("Email already exist");
                        $("#email_msg").css("color", "red");
                    }
                    // $("#form")[0].reset();
                }
            });
        }
    });
});