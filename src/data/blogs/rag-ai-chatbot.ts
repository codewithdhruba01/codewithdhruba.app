export const ragAiChatbot = {
    title: 'How I Built a RAG-based AI Chatbot from My Personal Data',
    date: 'March 07, 2026',
    author: 'Dhrubaraj Pati',
    category: 'AI & Machine Learning',
    readTime: '12 min read',
    image: '/blog/ragCover.png',
    tags: ['RAG', 'AI', 'LangChain', 'Python', 'LLM', 'Ollama', 'Vector Database'],
    content: `
    <p>When I started exploring the latest advancements in Artificial Intelligence, one concept kept appearing repeatedly — <strong>RAG (Retrieval Augmented Generation)</strong>.</p>

    <p>RAG is a powerful technique that combines <strong>information retrieval</strong> with <strong>large language models (LLMs)</strong> to generate responses based on custom data. Instead of relying only on the model’s pre-trained knowledge, a RAG system retrieves relevant information from a specific dataset and then uses that information to generate accurate answers.</p>

    <p>This approach makes AI systems significantly more <strong>context-aware, reliable, and useful for domain-specific tasks</strong> such as study assistants, document analysis tools, and internal business knowledge systems.</p>

    <p>To better understand how RAG works in practice, I built a <strong>personalized AI chatbot</strong> that can answer questions from my own documents like PDFs, notes, and images.</p>

    <p>In this article, I’ll explain how the system works and walk through the complete architecture step by step.</p>


    <h2>Understanding RAG (Retrieval Augmented Generation)</h2>

    <p>In simple terms, <strong>RAG works in two main steps</strong>.</p>

    <h3>1. Retrieval</h3>
    <p>When a user asks a question, the system first searches through the available documents (such as PDFs, notes, or images) to find the most relevant pieces of information.</p>

    <h3>2. Generation</h3>
    <p>The retrieved information is then provided to a <strong>Large Language Model (LLM)</strong>. The model uses this context to generate a meaningful and accurate answer.</p>

    <p>Because the response is generated using <strong>actual retrieved content</strong>, the system becomes much more reliable and avoids hallucinating incorrect information.</p>

    <hr />

    <figure>
        <img src="/blog/ChatInterface.png" alt="Streamlit Chat Interface" style="width: 100%; border-radius: 12px; margin: 20px 0;" />
        <figcaption style="text-align: center; color: #666; font-size: 0.9em;">Personal AI Chatbot Interface</figcaption>
    </figure>

    <h2>About the Application</h2>

    <p>The application I built is an <strong>AI-powered chatbot designed to answer questions based on user-provided data</strong>.</p>

    <p>Instead of relying only on general knowledge, users can upload their own documents, including:</p>

    <ul>
      <li>PDFs</li>
      <li>Class notes</li>
      <li>Images containing text</li>
      <li>Text documents</li>
    </ul>

    <p>The system processes these files and converts them into a <strong>vector database</strong>, allowing the AI to efficiently search and retrieve relevant information.</p>

    <p>Whenever a user asks a question, the chatbot:</p>

    <ol>
      <li>Searches the vector database</li>
      <li>Retrieves the most relevant content</li>
      <li>Sends that context to the language model</li>
      <li>Generates a response based on the retrieved information</li>
    </ol>

    <p>This makes the chatbot <strong>context-aware and highly accurate</strong>.</p>

    <p>If the uploaded documents do not contain the required information, the chatbot clearly indicates that it cannot answer the question. This helps prevent misinformation.</p>

    <p>Another key feature is <strong>conversation memory</strong>. The chatbot stores chat history so it can understand follow-up questions naturally. For example, if a user asks about a topic and then asks a follow-up question using words like <em>“it”</em> or <em>“that topic”</em>, the chatbot understands the reference.</p>

    <p>Additionally, the chatbot can <strong>generate summaries of uploaded documents</strong>, helping users quickly understand key insights from large files.</p>


    <h2>Technologies Used</h2>

    <p>The chatbot was built using the following technologies:</p>

    <ul>
      <li><strong>LangChain</strong> – For orchestrating the RAG pipeline</li>
      <li><strong>Sentence Transformers</strong> – For generating embeddings</li>
      <li><strong>Chroma DB</strong> – As the vector database</li>
      <li><strong>Streamlit</strong> – For the user interface</li>
      <li><strong>Ollama (Llama 3)</strong> – As the local large language model</li>
      <li><strong>PyPDF2 / PyPDF</strong> – For PDF processing</li>
      <li><strong>Tesseract OCR</strong> – For extracting text from images</li>
    </ul>

    <p>This stack allows the chatbot to process multiple types of documents and run locally without relying on external APIs.</p>

    <h2>System Architecture</h2>

    <p>The project architecture consists of <strong>six main components</strong>.</p>

    <figure>
        <img src="/blog/RagArchitecture.png" alt="RAG System Architecture Diagram" style="width: 100%; border-radius: 12px; margin: 20px 0;" />
        <figcaption style="text-align: center; color: #666; font-size: 0.9em;">High-level System Architecture</figcaption>
    </figure>

    <h2>1. Document Upload and Processing</h2>

    <p>The first step is allowing users to upload documents.</p>

    <p>These documents may include PDF files, text files, and images containing text. The system processes these files and extracts the text content.</p>

    <p>For PDFs, libraries such as <strong>PyPDF</strong> are used to read and extract text. For images, <strong>Tesseract OCR</strong> is used to detect and extract text from the image.</p>

    <p>Example:</p>

    <pre><code class="language-python">from PIL import Image
import pytesseract

image = Image.open("notes.png")
text = pytesseract.image_to_string(image)</code></pre>

    <p>This step converts all data into <strong>plain text format</strong>, which is necessary for further processing.</p>

    <h2>2. Splitting Text into Chunks</h2>

    <img src="/blog/chank.jpeg" alt="Splitting text into chunks" style="width: 100%; border-radius: 12px; margin: 20px 0;" />

    <p>Documents can often be very large, sometimes containing thousands of words. Since LLMs have <strong>context length limitations</strong>, the text must be divided into smaller sections called <strong>chunks</strong>.</p>

    <p>Chunking improves both performance and retrieval accuracy. LangChain provides a built-in text splitter for this purpose.</p>

    <p>Example:</p>

    <pre><code class="language-python">from langchain.text_splitter import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

chunks = text_splitter.split_documents(documents)</code></pre>

    <p>Each chunk now contains a manageable piece of text that can be processed efficiently.</p>

    <h2>3. Creating Embeddings and Vector Database</h2>

    <p>After splitting the documents into chunks, each chunk is converted into a <strong>vector representation called an embedding</strong>.</p>

    <p>Embeddings capture the <strong>semantic meaning of text</strong>. For example, two sentences with similar meanings will have embeddings that are close to each other in vector space.</p>

    <p>We use <strong>Sentence Transformers</strong> to generate embeddings.</p>

    <pre><code class="language-python">from langchain_huggingface import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="all-MiniLM-L6-v2"
)</code></pre>

    <p>These embeddings are then stored in a <strong>vector database</strong>. For this project, we use <strong>Chroma DB</strong>.</p>

    <pre><code class="language-python">from langchain.vectorstores import Chroma

db = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="chroma_db"
)</code></pre>

    <p>This creates a searchable knowledge base from the uploaded data.</p>

    <h2>4. Retrieving Relevant Context</h2>

    <p>When a user asks a question, the system searches the vector database to find the most relevant chunks. This process is called <strong>semantic search</strong>.</p>

    <p>Example:</p>

    <pre><code class="language-python">retriever = db.as_retriever(
    search_type="similarity",
    search_kwargs={"k":4}
)</code></pre>

    <p>This retrieves the <strong>top 4 most relevant chunks</strong> related to the user’s question. These chunks provide the context required for generating the answer.</p>

    <h2>5. Generating Answers with LLM</h2>

    <p>The retrieved context is passed to a <strong>Large Language Model</strong>. In this project, the model used is <strong>Llama 3 running locally through Ollama</strong>.</p>

    <p>Example:</p>

    <pre><code class="language-python">from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="llama3.1",
    temperature=0
)</code></pre>

    <p>LangChain’s <strong>Conversational Retrieval Chain</strong> combines retrieval with response generation.</p>

    <pre><code class="language-python">from langchain.chains import ConversationalRetrievalChain

qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever
)</code></pre>

    <p>This chain automatically retrieves relevant context, sends it to the LLM, and generates an answer.</p>

    <h2>6. Managing Conversation Context</h2>

    <p>To support follow-up questions, the chatbot maintains a <strong>chat history</strong>. This allows the system to understand references in later questions.</p>

    <p>For example:</p>
    <p><strong>User:</strong> <em>"What topics are covered in my physics notes?"</em></p>
    <p><strong>User:</strong> <em>"Is it detailed?"</em></p>

    <p>The chatbot understands that <strong>“it” refers to physics notes</strong>. This feature makes the conversation feel natural and interactive.</p>


    <h2>Building the Chat Interface with Streamlit</h2>

    <p>The entire chatbot interface was built using <strong>Streamlit</strong>. Streamlit provides built-in components for creating chat interfaces.</p>

    <p>Example:</p>

    <pre><code class="language-python">import streamlit as st

st.title("Personal Data Chatbot")

query = st.chat_input("Ask a question")

if query:
    response = qa_chain({"question": query})
    st.write(response["answer"])</code></pre>

    <p>With Streamlit, users can upload documents, ask questions, view answers instantly, and continue conversations naturally.</p>

    <h2>Additional Feature: Document Summarization</h2>

    <p>Another useful feature of the chatbot is <strong>automatic document summarization</strong>. Users can ask the chatbot to summarize a document or a specific topic.</p>

    <p>The system retrieves relevant chunks and instructs the LLM to generate a concise summary. This makes the chatbot useful for studying, reviewing notes, and understanding large documents quickly.</p>

    <h2>Why This Approach Is Powerful</h2>

    <p>Building a RAG chatbot offers several advantages:</p>

    <h3>Context-Aware Answers</h3>
    <p>The chatbot answers questions based on <strong>actual uploaded data</strong>, not just general knowledge.</p>

    <h3>Reduced Hallucination</h3>
    <p>Since responses are grounded in retrieved documents, the model is less likely to generate incorrect information.</p>

    <h3>Personalized Knowledge Assistant</h3>
    <p>Users can turn their personal documents into an <strong>interactive knowledge base</strong>.</p>

    <h3>Scalable Architecture</h3>
    <p>More documents can easily be added to the system without retraining the model.</p>

    <hr />

    <h2>Conclusion</h2>

    <p>Building this RAG-based chatbot helped me understand how modern AI systems can combine <strong>retrieval mechanisms with large language models</strong> to create powerful applications.</p>

    <p>By integrating tools like <strong>LangChain, Sentence Transformers, Chroma DB, and Ollama</strong>, it’s possible to build a fully functional <strong>AI assistant that works with your own data</strong>.</p>

    <p>As AI technology continues to evolve, <strong>RAG architectures will play a key role in making AI systems more reliable, context-aware, and practical for everyday use.</strong></p>
  `,
};
