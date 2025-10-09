import { useEffect, useRef, useState } from "react";

function App() {
  const [tempId, setTempId] = useState("");
  const [token, setToken] = useState("");
  const [postResponse, setPostResponse] = useState(null);
  const [imageResponse, setImageResponse] = useState(null);
  const [images, setImages] = useState([]);
  const imageInputRef = useRef();
  const postImageInputRef = useRef();

  // 1. Obtener tempId y token al montar
  useEffect(() => {
    async function fetchTempId() {
      try {
        const res = await fetch("http://localhost:3001/api/v1/tempid/");
        const data = await res.json();
        setTempId(data.tempId);
        setToken(data.token);
      } catch (err) {
        alert("Error obteniendo tempId");
      }
    }
    fetchTempId();
  }, []);

  // 2. Subir imagen asociada al tempId
  async function handleImageUpload(e) {
    e.preventDefault();
    const file = imageInputRef.current.files[0];
    console.log("Subiendo imagen con tempId:", tempId, "y archivo:", file);
    if (!file || !tempId)
      return alert("Selecciona una imagen y espera el tempId");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("tempId", tempId);

    const res = await fetch("http://localhost:3001/api/v1/image", {
      method: "POST",
      body: formData,
      headers: { "x-tempid-token": token },
    });
    const data = await res.json();
    setImageResponse(data);
    if (res.status !== 201) {
      console.error("Error subiendo imagen:", data.error || "Unknown error");
      return alert("Error subiendo imagen: " + (data.error || "Unknown error"));
    }
    setImages((prev) => [...prev, data]);
    imageInputRef.current.value = "";
  }
  // 3. Crear post/artículo y asociar imágenes
  async function handleCreatePost(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    formData.append("authorId", form.authorId.value);
    formData.append("title", form.title.value);
    formData.append("content", form.content.value);
    formData.append("banner", postImageInputRef.current.files[0]);
    formData.append("tempId", tempId);

    console.log("Creando artículo con tempId:", tempId);
    console.log("Archivo del artículo:", postImageInputRef.current.files[0]);
    console.log(
      "Datos del formulario:",
      Object.fromEntries(formData.entries())
    );

    const res = await fetch("http://localhost:3001/api/v1/article", {
      method: "POST",
      body: formData,
      headers: { "x-tempid-token": token },
    });

    const data = await res.json();
    setPostResponse(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold mb-4">Demo: TempId Upload & Posts</h1>
      <div className="mb-4 p-4 rounded bg-white shadow">
        <strong>tempId:</strong> {tempId}
        <br />
        <small>(Se usará para todas las imágenes y el nuevo post)</small>
      </div>

      {/* Subida de imagen */}
      <form
        onSubmit={handleImageUpload}
        className="mb-8 bg-white p-4 rounded shadow flex flex-col gap-2"
      >
        <label className="font-semibold">Subir Imagen Temporal</label>
        <input type="file" name="image" ref={imageInputRef} required />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Subir Imagen
        </button>
        {imageResponse?.url && (
          <div className="text-green-600 text-sm">
            Imagen subida: {imageResponse.url}
          </div>
        )}
      </form>

      {/* Lista de imágenes subidas */}
      {images.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold mb-2">Imágenes temporales subidas:</h2>
          <div className="flex gap-2 flex-wrap">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:3001${img.url}`}
                alt=""
                className="h-20 rounded border"
              />
            ))}
          </div>
        </div>
      )}

      {/* Crear post */}
      <form
        onSubmit={handleCreatePost}
        className="bg-white p-4 rounded shadow flex flex-col gap-2 w-80"
      >
        <label className="font-semibold">Crear Artículo</label>
        <input type="hidden" name="authorId" value="1" />
        <input
          type="text"
          name="title"
          placeholder="Título"
          required
          className="border p-1 rounded"
        />
        <input
          type="file"
          name="image"
          ref={postImageInputRef}
          required
          className="border p-1 rounded"
        />
        <textarea
          name="content"
          placeholder="Contenido"
          required
          className="border p-1 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Crear Artículo
        </button>
        {postResponse?.id && (
          <div className="text-green-600 text-sm">
            Artículo creado: ID {postResponse.id}, título: {postResponse.title}
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
