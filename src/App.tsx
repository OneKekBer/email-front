import { ChangeEvent, FormEvent, useState } from "react";

function App() {
   const [data, setData] = useState({
      email: "",
      subject: "hello",
      text: "hello",
      name: "",
      age: 0,
   });
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };
   console.log(import.meta.env.VITE_SERVER);
   console.log(data);

   const sendEmail = async () => {
      // Получите значения полей формы или создайте объект с данными, которые вы хотите отправить.
      const formData = data;

      try {
         const response = await fetch(
            import.meta.env.VITE_SERVER + "send-email",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json", // Укажите тип контента как JSON
               },
               body: JSON.stringify(formData), // Преобразуйте объект с данными в JSON-строку
            }
         );

         if (response.ok) {
            // Обработайте успешный ответ
            console.log("Email sent successfully!");
            alert("Email sent successfully!");
         } else {
            // Обработайте ошибку, если запрос не удался
            console.error("Error sending email.");
         }
      } catch (error) {
         console.error("An error occurred:", error);
      }
   };

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      sendEmail();
   };
   return (
      <div>
         <form action="" onSubmit={handleSubmit}>
            <input
               type="text"
               onChange={handleChange}
               value={data.email}
               placeholder="email"
               name="email"
               id=""
            />
            <input
               type="text"
               onChange={handleChange}
               value={data.name}
               name="name"
               id=""
            />
            <input
               type="text"
               onChange={handleChange}
               value={data.age}
               name="age"
               id=""
            />
            <button type="submit">submit</button>
         </form>
      </div>
   );
}

export default App;
