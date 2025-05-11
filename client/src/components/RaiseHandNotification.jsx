function RaiseHandNotification({ user }) {
     if (!user) return null;
   
     return (
       <div
         style={{
           marginBottom: "0.5rem",
           fontSize: "1rem",
           color: "#ffd54f",
           fontWeight: "600",
           animation: "fadeOut 8s forwards"
         }}
       >
         ✋ {user}
       </div>
     );
   }
   
   export default RaiseHandNotification;
   