import { useState, useEffect } from 'react';
import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification"
import Options from "./components/Options/Options";
import "./App.css";



const App = () => {
const [feedback, setFeedback] = useState(() => {
const savedFeedback = localStorage.getItem('feedback');
return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
});
  
  
useEffect(() => {
localStorage.setItem('feedback', JSON.stringify(feedback));
}, [feedback]);

const updateFeedback = (feedbackType) => {
setFeedback((prevFeedback) => ({
...prevFeedback,
[feedbackType]: prevFeedback[feedbackType] + 1,
}));
};

const resetFeedback = () => {
setFeedback({ good: 0, neutral: 0, bad: 0 });
};

const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

return (
<div 
className="background">
<Description />
<div className="container">
<div>
<Options
updateFeedback={updateFeedback}
resetFeedback={resetFeedback}
totalFeedback={totalFeedback}
/>
</div>
<div className="feedback-container">
{totalFeedback > 0 ? (
<Feedback
good={feedback.good}
neutral={feedback.neutral}
bad={feedback.bad}
total={totalFeedback}
positive={positiveFeedback}
/>
) : (
<Notification/>
)}
</div>
</div>
</div>
);
};

export default App;