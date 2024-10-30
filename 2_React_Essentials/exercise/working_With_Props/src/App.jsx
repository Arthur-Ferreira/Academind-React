export const data = [
  { title: "Learn React", description: "In-depth" },
  { title: "Understand React", description: "Deeper" }
];

export function CourseGoal({title, description}) {
return (
  <li>
    <h2>{title}</h2>
    <p>{description}</p>
  </li>
);
}

function App() {
return (
  <div id="app" data-testid="app">
    <h1>Time to Practice</h1>
    <p>One course, many goals! 🎯</p>
    <ul>
      {/* OUTPUT AT LEAST TWO CourseGoal components here */}
      {/* One of them should have a title of “Learn React” and a description of “In-depth” */}
      <CourseGoal {...data[0]} />
      <CourseGoal {...data[1]} />
    </ul>
  </div>
);
}

export default App;