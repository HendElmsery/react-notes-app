import Axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'
import jwtDecode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Home() {
  var token = localStorage.getItem('token')

  if (token) {
    var decodedToken = jwtDecode(token);

  }

  const [userNotes, setuserNotes] = useState([])
  const [note, setnote] = useState({ 'title': '', 'desc': '', token, userID: decodedToken._id })



  ////get notes from api////////
  async function getUserNotes() {
    let { data } = await Axios.get(`https://route-egypt-api.herokuapp.com/getUserNotes`, {

      headers: {
        Token:token,
        userID: decodedToken._id
      }

    })
    setuserNotes(data.Notes)
    // console.log(data)
   
  }
  //add note /////////
  async function addUserNote(e) {
    e.preventDefault()
    let { data } = await Axios.post('https://route-egypt-api.herokuapp.com/addNote', note)
    console.log(data);
    
    //
    if (data.message === 'success') {
      document.getElementById('add-form').reset()
      getUserNotes()
      console.log(data);
    }

 else{
  console.log(data);
 }
  }
  function getNote({ target }) {
    setnote({ ...note, [target.name]: target.value })


  }
  //update note ///////////
  function getNoteId(NoteIndex) {
    console.log(userNotes[NoteIndex]);
    document.querySelector("#exampleModal1 input").value = userNotes[NoteIndex].title;
    document.querySelector("#exampleModal1 textarea").value = userNotes[NoteIndex].desc;
    setnote({ ...note, 'title': userNotes[NoteIndex].title, 'desc': userNotes[NoteIndex].desc, NoteID: userNotes[NoteIndex]._id })
  }
  async function editUserNote(e) {
    e.preventDefault()
    let { data } = await axios.put('https://route-egypt-api.herokuapp.com/updateNote', note)
    console.log(data);
    if (data.message === "updated") {
      document.getElementById('add-form').reset()
      getUserNotes()
      Swal.fire(
        'Updated!',
        'Your file has been Updated.',
        'success'
      )

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: data.message
      })
    }

  }

  ///delte note/////////
  function deleteNote(NoteID) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        Axios.delete('https://route-egypt-api.herokuapp.com/deleteNote', {
          data: {
            NoteID,
            token
          }
        }).then((response) => {

          if (response.data.message === 'deleted') {
            getUserNotes()
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: response.data.message
            })
          }

        })

      }
    })




  }

  useEffect(() => {


    
    getUserNotes()

  
},[])

  return (
    <div>
      {/* // modal ///////////// */}




      <div className="modal fade scroll-x" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {/* ////////// */}
              <form onSubmit={addUserNote} id="add-form">
                <input onChange={getNote} className="form-control " formcontrolname="title" placeholder="Title" type="text" name='title'></input>
                <div className="col-md-12 mt-3">
                  <textarea onChange={getNote} className="form-control " cols="30" formcontrolname="desc" placeholder="Type your Note" rows="10" name='desc'></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-info" data-bs-dismiss="modal">Save </button>
                </div>
              </form>
            </div>



          </div>
        </div>
      </div>

      {/*     end modal       add note          */}

      {/* start edit note modal */}

      <div className="modal fade" id="exampleModal1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {/* ////////// */}
              <form onSubmit={editUserNote} id="edit-form">
                <input onChange={getNote} className="form-control " formcontrolname="title" placeholder="Title" type="text" name='title'></input>
                <div className="col-md-12 mt-3">
                  <textarea onChange={getNote} className="form-control " cols="30" formcontrolname="desc" placeholder="Type your Note" rows="10" name='desc'></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal" data-backdrop="static">Close</button>
                  <button type="submit" className="btn btn-info" data-bs-dismiss="modal">Save </button>
                </div>
              </form>
            </div>



          </div>
        </div>
      </div>
      {/* end modall!!!!!!!!! */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">

            <button className="btn btn-info float-end mt-3" 
            data-target="#AddNote" data-toggle="modal" data-bs-toggle="modal" 
            data-bs-target="#exampleModal" >Add Note</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">


          {userNotes?.map((note, index) => {
            return (
              <div key={note._id} className="col-md-3 my-4 col-12">
                <div className="note p-4 ">
                  {/* ------------drop down------------------ */}

                  <div className="dropdown">
                    <i className="fa-solid fa-ellipsis-vertical float-end bold pointer" data-bs-toggle="dropdown" aria-expanded="false"></i>

                    <ul className="dropdown-menu pointer">

                      <li onClick={() => getNoteId(index)} className="dropdown-item"
                       data-bs-toggle="modal" data-bs-target="#exampleModal1" data-target="#exampleModal1">
                        Edit
                        <i className="fa-solid fa-pen-to-square float-end blue"></i>
                        </li>
                      <li onClick={() => deleteNote(note._id)} className="dropdown-item" >
                     
                        Delete
                        <i className="fa-solid fa-trash-can float-end red"></i>
                        </li>
                       
                    </ul>
                  </div>
                  {/*  */}
                  <h3 className='bold mb-2  ' > {note.title}</h3>
                  <p>{note.desc}</p>

                </div>
              </div>

            )
          })}
        </div>
      </div>
    </div>
  )

}
