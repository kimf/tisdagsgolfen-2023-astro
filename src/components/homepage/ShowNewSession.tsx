import { useState } from 'react';
import NewSessionForm from '../scoring/NewSessionForm';

export default function ShowNewSession() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {!showForm ? (
        <button onClick={() => setShowForm(true)}>Starta ny runda</button>
      ) : (
        <div>
          <div>
            <h3>Starta ny runda</h3>
            <NewSessionForm
              onCreateSession={(session) => {
                window.location.href = `/scoring/${session.id}`;
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
