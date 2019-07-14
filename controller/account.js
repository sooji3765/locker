const request = require('request');
const router = require('express').Router()
const mysql = require('mysql');

var connection   = require('../config/database');

router.get('/', (req, res) => {
  userseqnum = "1100035211";
  accessToken = "9dc3e1d3-7c9f-4311-bcd5-bdde471aef18";
  var url = "https://testapi.open-platform.or.kr/user/me?user_seq_no=" + userseqnum;
  
  var option = {
    method : "GET",
    url : url,
    headers : {
      Authorization : "Bearer " + accessToken,
    },
  };
  request(option, (err, response, body) => {
    if(err) {
      console.error(err);
      throw err;
    } else {
      var accountResult = JSON.parse(body);
      res.json(JSON.parse(body));
    }
  });
});

router.get('/balance', (req, res) => {

  fintech_use_num = "199005200057726135180939";
  accessToken = "9dc3e1d3-7c9f-4311-bcd5-bdde471aef18";
  tran_dtime = "20160310101921";
  var url = "https://testapi.open-platform.or.kr/account/balance?fintech_use_num=" + fintech_use_num + "&tran_dtime=" + tran_dtime;

  var option = {
    method : "GET",
    url : url,
    headers : {
      Authorization : "Bearer " + accessToken,
    },
  };
  request(option, (err, response, body) => {
    if(err) {
      console.error(err);
      throw err;
    } else {
      res.json(JSON.parse(body));
    }
  });
});

router.get('/transaction_list', (req, res) => {
  fintech_use_num = "199005200057726135180939";
  accessToken = "9dc3e1d3-7c9f-4311-bcd5-bdde471aef18";
  var qs = 
      "?fintech_use_num=" + fintech_use_num + "&"
      + "inquiry_type=A&"
      + "from_date=20160404&"
      + "to_date=20160405&"
      + "sort_order=D&"
      + "page_index=1&"
      + "tran_dtime=20190712154216";
      //+ "tran_dtime=20160310101921";
      //+ "befor_inquiry_trace_info=123&"
      //+ "list_tran_seqno=0"

  var url = "https://testapi.open-platform.or.kr/account/transaction_list" + qs;

  var option = {
    method : "GET",
    url : url,
    headers : {
      Authorization : "Bearer " + accessToken,
    },
  };
  request(option, (err, response, body) => {
    if(err) {
      console.error(err);
      throw err;
    } else {
      res.json(JSON.parse(body));
    }
  });
});

router.post('/transfer/withdraw', (req, res) => {
  fintech_use_num = "199005200057726135180939";
  accessToken = "9dc3e1d3-7c9f-4311-bcd5-bdde471aef18";
  var url = "https://testapi.open-platform.or.kr/transfer/withdraw";

  var option = {
    method : "POST",
    url : url,
    headers : {
      Authorization : "Bearer " + accessToken,
      "Content-Type" : "application/json; charset=UTF-8",
    },
    json : {
      dps_print_content : "쇼핑몰환불",
      fintech_use_num : fintech_use_num,
      tran_amt : "10000",
      tran_dtime : "20160310101921"
    }
  };

  request(option, (err, response, body) => {
    if(err) {
      console.error(err);
      throw err;
    } else {
      res.json(body);
    }
  });
});

module.exports = router