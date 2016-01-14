'use strict';

$(document).ready(init);
var id = 0;
var contacts = [];
function init() {
  initializeLocalStorage();
  initializeList();
  $('.addContact').click(addContact);
  $('.container2').on('click', '.trash', rmvitem);
  $('.container2').on('click', '.modify', updateContact);
}

function initializeLocalStorage() {
  if(!localStorage.contacts) {
    localStorage.contacts = '[]';
  }
}
function initializeList(){
    contacts = JSON.parse(localStorage.contacts);
    contacts.map(function(contact, i){
      var $tr = $('#template').clone().attr('id', 'contact'+i);
      $('tbody').prepend($tr);
      var glyph = $('<span>').addClass('glyphicon glyphicon-trash').attr('aria-hidden', 'true');
      var $button1 = $('<button>').addClass('btn btn-default trash btn-xs').attr('aria-label', 'Left Align').attr('id', 'remove'+i).append(glyph);
      var $button2 = $('<button>').addClass('btn btn-info modify btn-xs').attr('aria-label', 'Left Align').attr('id', 'modify'+i).text('Update contact');

      $('tr#contact'+i +' .names').text(contact.name);
      $('tr#contact'+i +' .numbers').text(contact.number);
      $('tr#contact'+i +' .emails').text(contact.email);
      $('tr#contact'+i +' .remove').append($button1,$button2);
      // var n = $('<td>').text(contact.name);
      // var num = $('<td>').text(contact.number);
      // var em = $('<td>').text(contact.email);
      // var tr = $('<tr>').attr('id', 'contact'+contact.id).append(n,num,em);
      // $()
    });
id+=contacts.length;
}

function rmvitem(e){
  var $row = $(e.target).closest('tr');
  var index = parseInt($row.attr('id').slice(-1));
  contacts.splice(index,1);
  localStorage.contacts = JSON.stringify(contacts);
  $row.remove();
}


function updateContact(e){
  var $row = $(e.target).closest('tr');
  var index = parseInt($row.attr('id').slice(-1));
  var mname = prompt('Enter name');
  var mnum = prompt('Enter number');
  var memail = prompt('Enter email');
  $row.children('td:first').text(mname);
  $row.children('td:nth-child(2)').text(mnum);
  $row.children('td:nth-child(3)').text(memail);
  contacts[index].name = mname;
  contacts[index].number = mnum;
  contacts[index].email = memail;

}

function addContact(e) {
  e.preventDefault();
  var name = $('#name').val();
  var number = $('#number').val();
  var email = $('#email').val();
  var contact = {id: id, name:name, number:number, email:email};
  contacts = JSON.parse(localStorage.contacts);
  contacts.push(contact);
  localStorage.contacts = JSON.stringify(contacts);
  var $tr = $('#template').clone().attr('id', 'contact'+id);
  $('tbody').prepend($tr);
  var glyph = $('<span>').addClass('glyphicon glyphicon-trash').attr('aria-hidden', 'true');
  var $button1 = $('<button>').addClass('btn btn-default trash btn-xs').attr('aria-label', 'Left Align').attr('id', 'remove'+id).append(glyph);
  var $button2 = $('<button>').addClass('btn btn-info modify btn-xs').attr('aria-label', 'Left Align').attr('id', 'modify'+id).text('Update contact');

  $('tr#contact'+id +' .names').text(name);
  $('tr#contact'+id +' .numbers').text(number);
  $('tr#contact'+id +' .emails').text(email);
  $('tr#contact'+id +' .remove').append($button1,$button2);
  $('input').val('');
    id++;

  $('th#names').on('click', function(){ //displays contacts alphabetically
  var arrofnames = [];
  var arrofsorted =[];
  for(var i =0; i<id; i++){
    arrofnames.push($('tr#contact'+i).text()+i);
  }
  arrofnames.sort();
  for(var r=0; r<arrofnames.length;r++){
      var hey = (arrofnames[r].charAt(arrofnames[r].length-1));
      arrofsorted.push($('tr#contact'+hey));
  }
  $('tbody tr').detach();
  $('tbody').append(arrofsorted);
  });

  $('th#emails').on('click', function(){ //displays contacts alphabetically
  var arrofemails = [];
  var arrofsorted =[];
  for(var i =0; i<id; i++){
    arrofemails.push($('#contact'+ i+ ' .emails').text()+i);
  }
  arrofemails.sort();
  for(var r=0; r<arrofemails.length;r++){
      var hey = arrofemails[r].charAt(arrofemails[r].length-1);
      arrofsorted.push($('tr#contact'+hey));
  }
  $('tbody tr').detach();
  $('tbody').append(arrofsorted);
  });

  $('th#numbers').on('click', function(){ //displays by numbers but that doesnt make sense
    var arrofnumbers = [];
    var arrofsorted =[];
    for(var i =0; i<id; i++){
      arrofnumbers.push($('#contact'+ i+ ' .numbers').text()+i);
    }
    arrofnumbers.sort();
    for(var r=0; r<arrofnumbers.length;r++){
        var hey = arrofnumbers[r].charAt(arrofnumbers[r].length-1);
        arrofsorted.push($('tr#contact'+hey));
    }
    $('tbody tr').detach();
    $('tbody').append(arrofsorted);
  });
}
