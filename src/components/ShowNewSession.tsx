import { useState } from 'react';
import NewSessionForm from './NewSessionForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShowNewSession() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      {!showForm ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition-colors"
        >
          Starta ny runda
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Starta ny runda</h3>
              <NewSessionForm 
                onCreateSession={(session) => {
                  window.location.href = `/scoring/${session.id}`;
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
