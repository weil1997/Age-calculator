import React, { useState } from "react";

const Todo = () => {
  // tasks kommer att användas för att lagra en lista med uppgifter
  const [tasks, setTasks] = useState([]);

  // Newtask, kommer att användas för att lagra akutella uppgiften som användaren skriver in i ett inamtningsfält
  const [newTask, setNewTask] = useState("");

  // När denna funktion anropas tar den emot en händelse som skapas när användaren ändrar innehållet i ett textfält
  const handleTaskChange = (e) => {
    // denna kod säger att vi tar reda på värdet som användaren har skrivit.genom att använda e.target.value kan du få tillgång till användarens inmatade data och utföra återgärder eller uppdatera tillståndet
    setNewTask(e.target.value);
  };

  // denna kod definerar en funktion med namnet "handletasksubmit" funktionen används för att handtera händelsen när användaren skickar in ett formulär genom att trycka på en knapp eller använda en linknande utlösare
  const handleTaskSubmit = (e) => {
    // det normala standrabeteendet när man klickar på en knapp, eller skickar in ett formulär så kan sidan ladda om eller navigera till en ny sida. e.precentdefault() förhindrar det och låter oss stanna kvar på samma sida.
    e.preventDefault();

    // detta denna kod säger att om användaren skulle lägga till en tom sträng, dvs ingenting, en blank rad. om användaren lägger till en tom sträng kommer så kommer if satsen vara falsk och koden komnmer inte köras
    if (newTask.trim() == !"") {
      // i denna kod skapar vi en ny array med det befintliga värdet task, och lägger sedan till värdet av newtask som representerar de aktuella upggifterna som har lagts till av användaren
      const updatedTasks = [...tasks, newTask];

      // funktionen setTasks kommer att uppdatera värdet av tillståndet 'tasks' med det nya värdet updatedtasks. detta triggar en omrendering där den nya värdet tasks används
      setTasks(updatedTasks);

      setNewTask("");
    }
  };
  // detta är en funktion som används för att hantera händelsen när ne uppgift ska tas bort från listan
  const handleTaskDelete = (index) => {
    // här gör vi en kopa utav den befintliga tasks arrayen genom att använda spread operatorn, detta görs för att undvika ändring av den befintliga arrayen och istället skapar en ny kopia utav den
    const updatedTasks = [...tasks];

    // med updatetask.slice så tar vi bort ett element från arrayen. vi använder index för att specifiera element som ska tas bort och 1 betyder att vi bara vill ta bort ett element
    updatedTasks.splice(index, 1);

    // genom att anropa settask(updatedtask) uppdateras värdet av tillståndet task och en omrendering av komponenten görs
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Todo App</h2>

      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          value={newTask}
          // detta betyder att om new task uppdateras så kommer även value att uppdateras
          onChange={(e) => setNewTask(e.target.value)}
          // onchange används för att specifiera vilken funktion som ska köras när värdet av inmatningskomponenten ändras. det betyder att när användaren skriver i textfältet och värder ändras så kommer funktionen handletaskchange att köras
          placeholder="Lägg till uppgift"
        ></input>
        <button type="submit">submit</button>
      </form>

      <button type="delete">delete</button>
      <ul>
        {tasks.map((task, i) => {
          return (
            <li key={index}>
              {task}

              <button type="delete" onClick={() => handleTaskDelete(index)}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
