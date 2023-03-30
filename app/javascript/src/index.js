import $ from 'jquery';

import {
    indexTasks,
    postTask,
    markComplete,
    markActive,
    deleteTask
} from "./requests.js";


$(document).ready(function () {

    var getTasks = function () {
        indexTasks(function (response) {

            var activeString = response.tasks.map(function (task) {
                if (task.completed === false) {
                    return `<div class='col-12 mb-3 p-2 border rounded task d-flex justify-content-between' data-id='${task.id}' >
      <span>${task.content}</span> <span><input class="mark mx-2" type="checkbox"/><button class="delete btn btn-outline-danger mx-2">delete</button></span>
      </div>`;
                }
            });

            var completedString = response.tasks.map(function (task) {
                if (task.completed === true) {
                    return `<div class='col-12 mb-3 p-2 border rounded task d-flex justify-content-between' data-id='${task.id}' >
      <span>${task.content}</span> <span><input class="mark mx-2" type="checkbox" checked/><button class="delete btn btn-outline-danger mx-2">delete</button></span>
      </div>`;
                }
            });

            $("#active-tasks").html(activeString);
            $("#completed-tasks").html(completedString);
            console.log("tasks added")
        });
    }

    getTasks()
    $(document).on("click", "#add-task", function () {
        console.log("adding task");
        postTask($("#new-task").val(), function () {
            $("#new-task").val("");
            getTasks();
        });
    });

    $(document).on("change", ".mark", function () {
        console.log("marked");
        var id = $(this).parent().parent().attr('data-id')
        if (this.checked === true) {
            markComplete(id, function () {
                getTasks()
            });
        } else {
            markActive(id, function () {
                getTasks()
            });
        }
    });

    $(document).on('click', '.delete', function () {
        console.log("deleting");
        var id = $(this).parent().parent().attr('data-id');
        deleteTask(id, function () {
            getTasks()
        }
        )
    })

});