$(document).ready(function () {
  let langAr = true;

  $(".hidden-file-input").on("change", function (e) {
    var file = $(this)[0].files[0];
    $(this).siblings(".input-file-label").text(file.name);
  });
  //
  $(".join-merchant-btn").click(function (e) {
    // e.preventDefault();
    $(".ui.modal.join-merchant-modal").modal({ centered: true }).modal("show");
  });
  //
  $(".recruitment-btn").click(function (e) {
    e.preventDefault();
    $(".ui.modal.recruitment-modal").modal({ centered: true }).modal("show");
  });
  //
  $(".contact-us-btn").click(function (e) {
    e.preventDefault();
    $(".ui.modal.contact-us-modal").modal("show");
  });

  // TOGGLE NAV
  $(".toggle-nav-btn").click(function () {
    $(".navbar").toggleClass("show-navbar");
  });

  // TOGGLE LANGUAGE
  $(".lang-btn").click(function () {
    var isRtl = $("html").attr("lang") == "ar";
    // isRtl ? $("html").attr("lang", "en") : $("html").attr("lang", "ar");
    if (isRtl) {
      $("html").attr("lang", "en");
      $(".dropdown.sellect-lang").val("en");
    }
    if (!isRtl) {
      $("html").attr("lang", "ar");
      $(".dropdown.sellect-lang").val("ar");
    }
  });
  $(".dropdown.sellect-lang").on("change", function (e) {
    const lang = $(this).val();
    if (lang == "ar") {
      $("html").attr("lang", "ar");
    }
    if (lang == "en") {
      $("html").attr("lang", "en");
    }
  });

  // GO TO TOP FUNC
  $(".go-top").click(function (e) {
    e.preventDefault();
    const id = $(this).attr("href");

    $(id)[0].scrollIntoView({ behavior: "smooth" });
  });

  //SET DATE
  $(".date").text(new Date().getFullYear());

  $(".input-file-resume").on("change", function (e) {
    $(".label-file-resume").text(e.target.files[0].name);
  });
  // $(".loader").fadeOut(1000);

  // $(".city-dropdown").dropdown();

  $(
    ".ui.form.contact-form, .join-form-wrapper, .recruitment-form-wrapper"
  ).submit(function (e) {
    e.preventDefault();
  });

  $(".contact-form .submit-btn").click(function (e) {
    e.preventDefault();
    // $('.ui.form.contact-form').form('clear');
    var _this = $(this);
    console.log($(".ui.form.contact-form").form("is valid"));
    const checkedVal = $(
      ".contact-form input:radio[name='contactreason']:checked"
    ).val();
    if ($(".ui.form.contact-form").form("is valid")) {
      var allFields = $(".ui.form.contact-form").form("get values");
      console.log(allFields);
      $(this).addClass("loading");
      const values = {
        name: allFields.name,
        email: allFields.email,
        message: allFields.message,
      };
      $.ajax({
        url: "http://api.subolaays.net/contact",
        type: "post",
        data: values,
        success: function (response) {
          $(".ui.form.contact-form").form("clear");
          _this.removeClass("loading");
          // $(".message-holder").removeClass("hidden");
          // setTimeout(() => {
          //   $(".message-holder").addClass("hidden");
          // }, 2500);
          $(".ui.modal.send-request").modal("show");

          $(".ui.modal.contact-us-modal").modal("hide");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
          _this.removeClass("loading");
        },
      });
    }
  });

  $(".join-form-wrapper .submit-btn").click(function (e) {
    e.preventDefault();
    // $('.ui.form.contact-form').form('clear');
    var allFields = $(".ui.form.join-form-wrapper").form("get values");
    console.log(allFields);
    var _this = $(this);
    if ($(".ui.form.join-form-wrapper").form("is valid")) {
      var allFields = $(".ui.form.join-form-wrapper").form("get values");
      $(this).addClass("loading");
      const values = {
        name: allFields.name,
        company: allFields.businessName,
        phone: allFields.Phonenumber,
        area: allFields.city,
      };
      $.ajax({
        url: "http://api.subolaays.net/vendor",
        type: "post",
        data: values,
        success: function (response) {
          $(".ui.form.join-form-wrapper").form("clear");
          _this.removeClass("loading");
          // $(".message-holder").removeClass("hidden");
          // setTimeout(() => {
          //   $(".message-holder").addClass("hidden");
          // }, 2500);
          $(".ui.modal.send-request").modal("show");

          $(".ui.modal.join-merchant-modal").modal("hide");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
          _this.removeClass("loading");
        },
      });
    }
  });

  var base64file;
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      base64file = reader.result.split(",")[1];
      //  base64file = reader.result;
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  $("#resume").on("change", function () {
    getBase64($("#resume")[0].files[0]);
  });

  $(".recruitment-form-wrapper .submit-btn").click(function (e) {
    e.preventDefault();
    // $('.ui.form.contact-form').form('clear');
    // var cvFile = $('#hidden-new-file1').get(0).files[0];
    // console.log(cvFile)
    // console.log(base64file);
    var _this = $(this);
    if ($(".ui.form.recruitment-form-wrapper").form("is valid")) {
      var allFields = $(".ui.form.recruitment-form-wrapper").form("get values");
      $(this).addClass("loading");
      console.log(base64file);
      const values = {
        name: allFields.name,
        category: allFields.specialization,
        phone: allFields.Phonenumber,
        cv: "data:text/plain;base64," + base64file,
      };
      console.log(values);
      // let body = new FormData();
      // body.append('cv', $('#hidden-new-file1')[0].files[0]);
      // body.append('phone', allFields.Phonenumber);
      // body.append('name', allFields.name);
      // body.append('category', allFields.specialization);
      $.ajax({
        url: "http://api.subolaays.net/job",
        type: "post",
        data: values,
        success: function (response) {
          $(".ui.form.recruitment-form-wrapper").form("clear");
          _this.removeClass("loading");
          $(".ui.modal.send-request").modal("show");

          // $(".message-holder").removeClass("hidden");
          // setTimeout(() => {
          //   $(".message-holder").addClass("hidden");
          // }, 2500);

          $(".ui.modal.recruitment-modal").modal("hide");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
          _this.removeClass("loading");
        },
      });
    }
  });

  $(".ui.form.signup-form-wrapper").form({
    fields: {
      name: {
        identifier: "name",
        rules: [
          {
            type: "empty",
            prompt: ` ${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[3]",
            prompt: `{name} ${auth.min3}`,
          },
        ],
      },
      facilityName: {
        identifier: "facilityName",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[3]",
            prompt: `{name} ${auth.min3}`,
          },
        ],
      },

      reasoncontact: {
        identifier: "message",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[8]",
            prompt: `برجاء ادخال عدد احرف بين 8 و 250 حرف`,
          },
        ],
      },
      // region: {
      //   identifier: "region",
      //   rules: [
      //     {
      //       type: "empty",
      //       prompt: `${auth.pleaseEnter} {name}`,
      //     },
      //     {
      //       type: "minLength[3]",
      //       prompt: `{name} ${auth.min3}`,
      //     },
      //   ],
      // },

      email: {
        identifier: "email",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "email",
            prompt: `${auth.vaildEmail}`,
          },
        ],
      },
      phone: {
        identifier: "Phonenumber",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[8]",
            prompt: `${auth.phoneMin} {ruleValue}`,
          },
          {
            type: "maxLength[11]",
            prompt: `${auth.phoneMax} {ruleValue}`,
          },
        ],
      },
      companyName: {
        identifier: "companyName",
        depends: "isCompnyOwner",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[3]",
            prompt: `{name} ${auth.min3}`,
          },
        ],
      },
      companyField: {
        identifier: "companyField",
        depends: "isCompnyOwner",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[3]",
            prompt: `{name} ${auth.min3}`,
          },
        ],
      },
      citydropdown: {
        identifier: "citydropdown",
        depends: "isCompnyOwner",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseSelect} {name}`,
          },
        ],
      },
      commercialNum: {
        identifier: "commercialNum",
        depends: "isCompnyOwner",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[8]",
            prompt: `${auth.phoneMin} {ruleValue}`,
          },
          {
            type: "maxLength[11]",
            prompt: `${auth.phoneMax} {ruleValue}`,
          },
        ],
      },
      taxNum: {
        identifier: "taxNum",
        depends: "isCompnyOwner",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[14]",
            prompt: "min {name} 14",
          },
          {
            type: "maxLength[14]",
            prompt: "max {name} 14",
          },
        ],
      },
      nationalId: {
        identifier: "nationalId",
        depends: "isCompnyOwner",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[14]",
            prompt: "min {name} 14",
          },
          {
            type: "maxLength[14]",
            prompt: "max {name} 14",
          },
        ],
      },
    },
    on: "change",
    inline: true,
    transition: "swing down",
    duration: 800,
  });
  // Join us form
  $(".ui.dropdown").dropdown();
  $(".ui.form.join-form-wrapper").form({
    fields: {
      name: {
        identifier: "name",
        rules: [
          {
            type: "empty",
            prompt: ` ${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[3]",
            prompt: `{name} ${auth.min3}`,
          },
        ],
      },
      products: {
        identifier: "products",
        rules: [
          {
            type: "empty",
            prompt: ` ${auth.pleaseEnter} {name}`,
          },
        ],
      },
      businessName: {
        identifier: "businessName",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[3]",
            prompt: `{name} ${auth.min3}`,
          },
        ],
      },
      city: {
        identifier: "city",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
        ],
      },
      phone: {
        identifier: "Phonenumber",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[8]",
            prompt: `${auth.phoneMin} {ruleValue}`,
          },
          {
            type: "maxLength[11]",
            prompt: `${auth.phoneMax} {ruleValue}`,
          },
        ],
      },
    },
    on: "change",
    inline: true,
    transition: "swing down",
    duration: 800,
  });

  $(".ui.form.contact-form").form({
    fields: {
      name: {
        identifier: "name",
        rules: [
          {
            type: "empty",
            prompt: ` ${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[3]",
            prompt: `{name} ${auth.min3}`,
          },
        ],
      },
      message: {
        identifier: "message",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[8]",
            prompt: `برجاء ادخال عدد احرف بين 8 و 250 حرف`,
          },
        ],
      },

      email: {
        identifier: "email",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "email",
            prompt: `${auth.vaildEmail}`,
          },
        ],
      },
    },
    on: "change",
    inline: true,
    transition: "swing down",
    duration: 800,
  });

  $(".ui.form.recruitment-form-wrapper").form({
    fields: {
      name: {
        identifier: "name",
        rules: [
          {
            type: "empty",
            prompt: ` ${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[3]",
            prompt: `{name} ${auth.min3}`,
          },
        ],
      },
      recruitmentFile: {
        identifier: "recruitmentFile",
        rules: [
          {
            type: "empty",
            prompt: ` ${auth.pleaseEnter} {name}`,
          },
        ],
      },

      specialization: {
        identifier: "specialization",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[3]",
            prompt: `{name} ${auth.min3}`,
          },
        ],
      },

      phone: {
        identifier: "Phonenumber",
        rules: [
          {
            type: "empty",
            prompt: `${auth.pleaseEnter} {name}`,
          },
          {
            type: "minLength[8]",
            prompt: `${auth.phoneMin} {ruleValue}`,
          },
          {
            type: "maxLength[11]",
            prompt: `${auth.phoneMax} {ruleValue}`,
          },
        ],
      },
    },
    on: "change",
    inline: true,
    transition: "swing down",
    duration: 800,
  });

  $(".ui.modal.send-request .btn-ok").click(function () {
    $(".ui.modal.send-request").modal("hide");
  });
});
