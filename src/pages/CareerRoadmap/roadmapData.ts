export type NodeStatus =
  | "not-started"
  | "learning"
  | "done"
  | "skip";

export interface RoadmapTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  importance: string;
  example: string;
  topics: string[];
}

export interface RoadmapSection {
  id: string;
  title: string;
  category: string;

  main: RoadmapTopic;

  left?: RoadmapTopic[];
  right?: RoadmapTopic[];
}

export interface RoadmapData {
  id: string;
  title: string;
  description: string;
  sections: RoadmapSection[];
}

export interface Domain {
  id: string;
  title: string;
  description: string;
}

export const domainList: Domain[] = [
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Build intelligent systems using data and algorithms.",
  },
  {
    id: "ai-engineering",
    title: "AI Engineering",
    description: "Build and integrate modern AI systems.",
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Build modern web applications.",
  },
  {
    id: "software-development",
    title: "Software Development",
    description: "Build reliable software systems.",
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Turn data into useful insights.",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Protect systems, networks and data.",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Build, deploy and operate scalable systems.",
  },
];

const topic = (
  id: string,
  title: string,
  category: string,
  description: string,
  importance: string,
  example: string,
  topics: string[]
): RoadmapTopic => ({
  id,
  title,
  category,
  description,
  importance,
  example,
  topics,
});

export const roadmapData: Record<string, RoadmapData> = {
  "machine-learning": {
    id: "machine-learning",

    title: "Machine Learning Roadmap",

    description:
      "A structured learning path from fundamentals to machine learning systems and deployment.",

    sections: [
      {
        id: "introduction",
        title: "Introduction",
        category: "START",

        main: topic(
          "introduction",
          "Introduction",
          "START",
          "Machine learning enables software systems to learn patterns from data and use those patterns to make predictions or decisions.",
          "Understanding the basic ML workflow makes the rest of the roadmap easier to understand.",
          "A shopping application can learn from previous purchases and recommend products to a customer.",
          [
            "What is Machine Learning?",
            "AI vs Machine Learning",
            "Training",
            "Inference",
            "Features",
            "Labels"
          ]
        ),

        left: [
          topic(
            "ml-types",
            "Types of Machine Learning",
            "FOUNDATION",
            "Machine learning approaches differ according to the type of feedback and data available during learning.",
            "Knowing the major categories helps you choose an appropriate approach for a problem.",
            "A labelled placement dataset can be used for supervised learning, while grouping students without labels is an unsupervised problem.",
            [
              "Supervised Learning",
              "Unsupervised Learning",
              "Semi-supervised Learning",
              "Reinforcement Learning"
            ]
          )
        ],

        right: [
          topic(
            "ml-workflow",
            "ML Workflow",
            "FOUNDATION",
            "An ML project usually moves from problem definition and data collection through preparation, training, evaluation and deployment.",
            "It gives you a practical structure for building real ML projects.",
            "A placement prediction system needs data preparation before its prediction model can be used.",
            [
              "Problem Definition",
              "Data",
              "Training",
              "Evaluation",
              "Deployment"
            ]
          )
        ]
      },

      {
        id: "mathematics",
        title: "Mathematical Foundations",
        category: "FOUNDATION",

        main: topic(
          "mathematics",
          "Mathematical Foundations",
          "FOUNDATION",
          "Mathematics provides the concepts used to represent data, calculate errors and optimize machine learning models.",
          "Understanding the basic mathematics makes algorithms less of a black box.",
          "Gradient descent uses derivatives to determine how model parameters should change.",
          [
            "Linear Algebra",
            "Calculus",
            "Probability",
            "Statistics",
            "Optimization"
          ]
        ),

        left: [
          topic(
            "linear-algebra",
            "Linear Algebra",
            "MATHEMATICS",
            "Linear algebra deals with vectors, matrices and mathematical operations on them.",
            "Datasets, images and model parameters can all be represented numerically using these structures.",
            "An image can be represented as a matrix of pixel values.",
            [
              "Vectors",
              "Matrices",
              "Dot Product",
              "Matrix Multiplication",
              "Eigenvalues",
              "Eigenvectors"
            ]
          ),

          topic(
            "calculus",
            "Calculus",
            "MATHEMATICS",
            "Calculus describes how quantities change and provides the mathematical basis for gradients.",
            "Optimization algorithms rely on gradients to improve model parameters.",
            "Gradient descent changes parameters in a direction that reduces prediction error.",
            [
              "Functions",
              "Derivatives",
              "Partial Derivatives",
              "Chain Rule",
              "Gradients"
            ]
          )
        ],

        right: [
          topic(
            "probability",
            "Probability",
            "MATHEMATICS",
            "Probability provides a way to reason about uncertainty and possible outcomes.",
            "Many ML predictions involve uncertainty rather than absolute certainty.",
            "A classifier may estimate that an email has a high probability of being spam.",
            [
              "Probability",
              "Random Variables",
              "Conditional Probability",
              "Bayes Theorem",
              "Distributions"
            ]
          ),

          topic(
            "statistics",
            "Statistics",
            "MATHEMATICS",
            "Statistics helps us understand datasets, variation and relationships between variables.",
            "It is essential for analysing data and evaluating model results.",
            "Mean and variance can describe the distribution of student CGPA values.",
            [
              "Mean",
              "Median",
              "Variance",
              "Standard Deviation",
              "Correlation",
              "Sampling"
            ]
          )
        ]
      },

      {
        id: "programming",
        title: "Programming Fundamentals",
        category: "PROGRAMMING",

        main: topic(
          "python",
          "Python Programming",
          "PROGRAMMING",
          "Python is widely used for machine learning because it combines readable syntax with a large data and ML ecosystem.",
          "You need programming skills to process data, train models and build applications around them.",
          "A Python program can load a dataset, clean it and train a classification model.",
          [
            "Syntax",
            "Variables",
            "Data Types",
            "Conditions",
            "Loops",
            "Functions",
            "OOP"
          ]
        ),

        left: [
          topic(
            "numpy",
            "NumPy",
            "PYTHON ECOSYSTEM",
            "NumPy provides efficient numerical arrays and mathematical operations.",
            "Machine learning involves large amounts of numerical data.",
            "Feature values can be stored in NumPy arrays and transformed before model training.",
            [
              "Arrays",
              "Indexing",
              "Vectorized Operations",
              "Matrix Operations",
              "Broadcasting"
            ]
          ),

          topic(
            "pandas",
            "Pandas",
            "PYTHON ECOSYSTEM",
            "Pandas provides tools for loading, cleaning and analysing tabular datasets.",
            "Data preparation is one of the most important parts of practical ML.",
            "A placement dataset can be loaded into a Pandas DataFrame and cleaned before training.",
            [
              "DataFrame",
              "Series",
              "CSV",
              "Filtering",
              "Missing Values",
              "Grouping"
            ]
          )
        ],

        right: [
          topic(
            "visualization",
            "Data Visualization",
            "PYTHON ECOSYSTEM",
            "Visualization turns numerical data into charts that make patterns easier to understand.",
            "Visual exploration can reveal trends, outliers and relationships before modelling.",
            "A scatter plot can show the relationship between CGPA and placement outcomes.",
            [
              "Matplotlib",
              "Seaborn",
              "Histograms",
              "Scatter Plots",
              "Box Plots"
            ]
          )
        ]
      },

      {
        id: "data",
        title: "Data Collection & Preparation",
        category: "DATA",

        main: topic(
          "data-collection",
          "Data Collection",
          "DATA",
          "Data collection is the process of obtaining the information required for a machine learning problem.",
          "A model cannot learn useful patterns from data that is missing, irrelevant or unreliable.",
          "A placement model may collect academic performance, projects, internships and coding information.",
          [
            "Databases",
            "APIs",
            "CSV",
            "JSON",
            "Excel",
            "Web Data"
          ]
        ),

        left: [
          topic(
            "data-cleaning",
            "Data Cleaning",
            "PREPROCESSING",
            "Data cleaning handles missing, duplicate, inconsistent and invalid data.",
            "Poor-quality input can lead to unreliable model behaviour.",
            "Missing CGPA values need to be handled before training a placement model.",
            [
              "Missing Values",
              "Duplicates",
              "Outliers",
              "Invalid Values",
              "Consistency"
            ]
          ),

          topic(
            "feature-engineering",
            "Feature Engineering",
            "PREPROCESSING",
            "Feature engineering transforms raw information into useful model inputs.",
            "Useful features can make important patterns easier for an algorithm to learn.",
            "Several project-related fields could be transformed into a meaningful experience feature.",
            [
              "Feature Creation",
              "Encoding",
              "Transformation",
              "Feature Selection",
              "Domain Knowledge"
            ]
          )
        ],

        right: [
          topic(
            "scaling",
            "Scaling & Normalization",
            "PREPROCESSING",
            "Scaling changes numerical features so their ranges are more comparable.",
            "Some ML algorithms are sensitive to differences in feature scale.",
            "CGPA and family income may have very different numerical ranges.",
            [
              "Standardization",
              "Normalization",
              "Min-Max Scaling",
              "Robust Scaling"
            ]
          ),

          topic(
            "eda",
            "Exploratory Data Analysis",
            "DATA ANALYSIS",
            "EDA involves examining data to understand distributions, relationships and unusual observations.",
            "EDA helps identify useful patterns before model training.",
            "A histogram can reveal whether student CGPA values are concentrated around a particular range.",
            [
              "Distributions",
              "Relationships",
              "Outliers",
              "Correlation",
              "Visualization"
            ]
          )
        ]
      },

      {
        id: "machine-learning-core",
        title: "Machine Learning",
        category: "CORE",

        main: topic(
          "machine-learning-core",
          "Machine Learning",
          "CORE",
          "Machine learning algorithms learn patterns from examples and use them to make predictions or discover structure.",
          "This is the central technical stage where prepared data becomes a predictive model.",
          "A classification model can learn from historical placement outcomes and predict an outcome for a new student.",
          [
            "Training",
            "Validation",
            "Testing",
            "Features",
            "Labels",
            "Model Selection"
          ]
        ),

        left: [
          topic(
            "supervised",
            "Supervised Learning",
            "MACHINE LEARNING",
            "Supervised learning uses examples where the expected output is known.",
            "It is useful for prediction problems with historical target values.",
            "A model can learn from students whose placement outcomes are already known.",
            [
              "Classification",
              "Regression",
              "Training Data",
              "Labels",
              "Cross Validation"
            ]
          )
        ],

        right: [
          topic(
            "unsupervised",
            "Unsupervised Learning",
            "MACHINE LEARNING",
            "Unsupervised learning searches for patterns in data without predefined target labels.",
            "It can reveal groups and structures that were not manually defined.",
            "Students can be grouped according to their skills and interests.",
            [
              "Clustering",
              "K-Means",
              "Hierarchical Clustering",
              "PCA",
              "Dimensionality Reduction"
            ]
          )
        ]
      },

      {
        id: "advanced",
        title: "Advanced Machine Learning",
        category: "ADVANCED",

        main: topic(
          "deep-learning",
          "Deep Learning",
          "ADVANCED",
          "Deep learning uses multi-layer neural networks to learn complex patterns.",
          "It is particularly useful for images, language, audio and other complex data.",
          "A CNN can learn visual features from images for image classification.",
          [
            "Neural Networks",
            "Activation Functions",
            "Backpropagation",
            "CNN",
            "RNN",
            "Transformers"
          ]
        ),

        left: [
          topic(
            "evaluation",
            "Model Evaluation",
            "EVALUATION",
            "Model evaluation measures how well a trained model generalizes to unseen data.",
            "A model that performs well only on training data may fail on real users.",
            "A placement classifier can be evaluated using precision, recall and F1-score.",
            [
              "Accuracy",
              "Precision",
              "Recall",
              "F1 Score",
              "Confusion Matrix",
              "ROC-AUC"
            ]
          )
        ],

        right: [
          topic(
            "deployment",
            "Deployment & MLOps",
            "PRODUCTION",
            "Deployment makes a trained model available to a real application, while MLOps helps maintain it over time.",
            "A model becomes useful when an application can reliably send data and receive predictions.",
            "A FastAPI service can expose a trained placement model to a React application.",
            [
              "Model Serialization",
              "FastAPI",
              "REST APIs",
              "Docker",
              "Cloud",
              "Monitoring"
            ]
          )
        ]
      },

      {
        id: "projects",
        title: "Build Real Projects",
        category: "BUILD",

        main: topic(
          "projects",
          "Real-World Projects",
          "BUILD",
          "Projects combine the concepts from the roadmap into complete working systems.",
          "Projects demonstrate that you can apply concepts rather than only study them theoretically.",
          "Build an end-to-end placement prediction platform with React, FastAPI and a trained ML model.",
          [
            "Problem Definition",
            "Dataset",
            "EDA",
            "Preprocessing",
            "Training",
            "Evaluation",
            "Deployment"
          ]
        )
      }
    ]
  },

  "ai-engineering": {
  id: "ai-engineering",
  title: "AI Engineering Roadmap",
  description:
    "A structured learning path from AI foundations to modern AI applications, LLMs, RAG, agents and production deployment.",

  sections: [
    {
      id: "ai-foundations",
      title: "AI Foundations",
      category: "START",

      main: topic(
        "ai-foundations",
        "AI Foundations",
        "START",
        "Artificial Intelligence is the field of building systems that can perform tasks that normally require human-like reasoning, learning, perception or decision-making.",
        "Understanding the foundations helps you distinguish AI, machine learning, deep learning and modern generative AI systems.",
        "A recommendation system can analyze user behaviour and provide personalized suggestions.",
        [
          "What is Artificial Intelligence?",
          "AI vs Machine Learning",
          "Machine Learning vs Deep Learning",
          "Generative AI",
          "AI Applications",
          "AI Engineering"
        ]
      ),

      left: [
        topic(
          "ai-vs-ml",
          "AI vs Machine Learning",
          "FOUNDATION",
          "AI is the broader field of intelligent systems, while machine learning is one approach for building systems that learn patterns from data.",
          "Knowing the relationship between AI and ML prevents confusion when choosing technologies and learning paths.",
          "A spam filter using a trained classifier is an ML system that belongs to the broader field of AI.",
          [
            "Artificial Intelligence",
            "Machine Learning",
            "Deep Learning",
            "Rule-based systems",
            "Generative AI"
          ]
        ),

        topic(
          "generative-ai",
          "Generative AI",
          "FOUNDATION",
          "Generative AI systems create new content such as text, images, audio, video or code based on learned patterns.",
          "Modern AI engineering increasingly involves building applications around generative models.",
          "A coding assistant can generate code from a natural-language description.",
          [
            "Generative models",
            "Large Language Models",
            "Text generation",
            "Image generation",
            "Code generation"
          ]
        )
      ],

      right: [
        topic(
          "ai-engineering-role",
          "AI Engineer Role",
          "FOUNDATION",
          "An AI Engineer builds applications that integrate AI models with software systems, data sources and user-facing interfaces.",
          "AI engineering requires more than model knowledge because production applications need APIs, databases, evaluation and deployment.",
          "An AI Engineer can build a document assistant using an LLM, vector database and web application.",
          [
            "AI application development",
            "Model integration",
            "APIs",
            "Data pipelines",
            "Evaluation",
            "Deployment"
          ]
        )
      ]
    },

    {
      id: "programming",
      title: "Programming & Python",
      category: "PROGRAMMING",

      main: topic(
        "python-ai",
        "Python for AI",
        "PROGRAMMING",
        "Python is widely used for AI because of its readable syntax and extensive ecosystem for data processing, machine learning and AI development.",
        "Strong programming fundamentals are necessary for building reliable AI applications.",
        "A Python application can process documents, call an AI model and return generated responses.",
        [
          "Python syntax",
          "Variables",
          "Data types",
          "Conditions",
          "Loops",
          "Functions",
          "OOP"
        ]
      ),

      left: [
        topic(
          "python-data-structures",
          "Python Data Structures",
          "PYTHON",
          "Python provides built-in structures such as lists, tuples, sets and dictionaries for organizing data.",
          "AI applications frequently manipulate collections of documents, messages, model outputs and configuration data.",
          "A dictionary can represent the metadata associated with a document.",
          [
            "Lists",
            "Tuples",
            "Sets",
            "Dictionaries",
            "Nested structures",
            "List comprehensions"
          ]
        ),

        topic(
          "python-oop",
          "Object-Oriented Programming",
          "PYTHON",
          "Object-oriented programming organizes software around classes and objects.",
          "OOP helps structure larger AI applications into reusable and maintainable components.",
          "A document-processing pipeline can be implemented as a reusable Python class.",
          [
            "Classes",
            "Objects",
            "Constructors",
            "Inheritance",
            "Encapsulation",
            "Polymorphism"
          ]
        )
      ],

      right: [
        topic(
          "numpy",
          "NumPy",
          "PYTHON ECOSYSTEM",
          "NumPy provides efficient numerical arrays and mathematical operations in Python.",
          "AI and ML systems frequently work with numerical arrays, vectors and matrices.",
          "Embeddings generated by an AI model can be represented and processed as numerical vectors.",
          [
            "ndarray",
            "Array operations",
            "Vector operations",
            "Matrix operations",
            "Reshaping",
            "Broadcasting"
          ]
        ),

        topic(
          "pandas-ai",
          "Pandas",
          "PYTHON ECOSYSTEM",
          "Pandas provides DataFrame and Series structures for loading, cleaning and analysing structured data.",
          "AI applications often require structured data preparation before it reaches a model.",
          "Customer records can be loaded into a DataFrame and cleaned before an AI pipeline uses them.",
          [
            "DataFrame",
            "Series",
            "CSV",
            "Filtering",
            "Missing values",
            "Grouping"
          ]
        )
      ]
    },

    {
      id: "machine-learning",
      title: "Machine Learning Foundations",
      category: "FOUNDATION",

      main: topic(
        "ml-foundations-ai",
        "Machine Learning",
        "FOUNDATION",
        "Machine learning allows systems to learn patterns from examples and use those patterns to make predictions or decisions.",
        "Many AI applications rely on machine learning models underneath the application layer.",
        "A fraud detection system can learn from historical transactions and classify new transactions.",
        [
          "Features",
          "Labels",
          "Training",
          "Validation",
          "Testing",
          "Inference"
        ]
      ),

      left: [
        topic(
          "supervised-learning-ai",
          "Supervised Learning",
          "MACHINE LEARNING",
          "Supervised learning uses examples where the expected output is already known.",
          "It is useful when an AI system needs to predict a known target.",
          "A model can learn from historical customer transactions labelled as fraudulent or legitimate.",
          [
            "Classification",
            "Regression",
            "Training data",
            "Labels",
            "Validation",
            "Cross-validation"
          ]
        ),

        topic(
          "unsupervised-learning-ai",
          "Unsupervised Learning",
          "MACHINE LEARNING",
          "Unsupervised learning discovers patterns or groups in data without predefined target labels.",
          "It can help discover hidden structures in large datasets.",
          "Customers can be grouped according to purchasing behaviour.",
          [
            "Clustering",
            "K-Means",
            "Hierarchical clustering",
            "Dimensionality reduction",
            "Pattern discovery"
          ]
        )
      ],

      right: [
        topic(
          "model-evaluation-ai",
          "Model Evaluation",
          "MACHINE LEARNING",
          "Model evaluation measures how well a model performs on data it has not seen during training.",
          "A model that performs well only on training data may fail when used by real users.",
          "A classification model can be evaluated using precision, recall and F1-score.",
          [
            "Accuracy",
            "Precision",
            "Recall",
            "F1 Score",
            "Confusion Matrix",
            "ROC-AUC"
          ]
        ),

        topic(
          "scikit-learn-ai",
          "Scikit-learn",
          "ML ECOSYSTEM",
          "Scikit-learn provides classical machine learning algorithms, preprocessing tools, model selection and evaluation utilities.",
          "It provides a practical foundation for implementing traditional ML components in AI systems.",
          "A classification model can be trained and evaluated using a scikit-learn pipeline.",
          [
            "Estimators",
            "Fit and predict",
            "Preprocessing",
            "Pipelines",
            "Model selection",
            "Metrics"
          ]
        )
      ]
    },

    {
      id: "deep-learning",
      title: "Deep Learning",
      category: "CORE",

      main: topic(
        "deep-learning-ai",
        "Deep Learning",
        "CORE",
        "Deep learning uses multi-layer neural networks to learn complex patterns from large amounts of data.",
        "Deep learning powers many modern computer vision, language and speech systems.",
        "A neural network can classify images by learning visual patterns from training examples.",
        [
          "Neural Networks",
          "Layers",
          "Weights",
          "Activation Functions",
          "Loss Functions",
          "Backpropagation"
        ]
      ),

      left: [
        topic(
          "neural-networks",
          "Neural Networks",
          "DEEP LEARNING",
          "Neural networks consist of interconnected computational units that learn parameters from training data.",
          "They provide the foundation for many modern AI models.",
          "A neural network can learn to classify handwritten digits.",
          [
            "Input layer",
            "Hidden layers",
            "Output layer",
            "Weights",
            "Bias",
            "Forward propagation"
          ]
        ),

        topic(
          "backpropagation",
          "Backpropagation",
          "DEEP LEARNING",
          "Backpropagation calculates how model parameters contributed to prediction error and uses that information during optimization.",
          "It is fundamental to training neural networks.",
          "A neural network adjusts its weights after calculating the error between its prediction and the expected output.",
          [
            "Loss",
            "Gradients",
            "Chain rule",
            "Gradient descent",
            "Weight updates"
          ]
        )
      ],

      right: [
        topic(
          "cnn",
          "Convolutional Neural Networks",
          "COMPUTER VISION",
          "CNNs are neural networks designed to work effectively with spatial data such as images.",
          "They are widely used for image classification and visual feature extraction.",
          "A CNN can classify images of different types of skin conditions.",
          [
            "Convolution",
            "Filters",
            "Feature maps",
            "Pooling",
            "Image classification"
          ]
        ),

        topic(
          "transformers",
          "Transformers",
          "DEEP LEARNING",
          "Transformers use attention mechanisms to process relationships between elements in sequential or structured data.",
          "Transformer architectures form the foundation of many modern language and multimodal models.",
          "A transformer-based language model can process a sequence of tokens and generate a response.",
          [
            "Attention",
            "Self-attention",
            "Tokens",
            "Positional information",
            "Encoder",
            "Decoder"
          ]
        )
      ]
    },

    {
      id: "llm",
      title: "Large Language Models",
      category: "GENERATIVE AI",

      main: topic(
        "llms",
        "Large Language Models",
        "GENERATIVE AI",
        "Large Language Models are neural models trained on large text datasets to understand and generate language.",
        "LLMs are a major foundation for modern AI assistants, coding tools and language-based applications.",
        "An AI tutor can use an LLM to answer questions and explain programming concepts.",
        [
          "Tokens",
          "Context",
          "Training",
          "Inference",
          "Parameters",
          "Language generation"
        ]
      ),

      left: [
        topic(
          "tokens",
          "Tokens & Tokenization",
          "LLM FUNDAMENTALS",
          "Tokenization converts text into smaller units that a language model can process.",
          "Understanding tokens helps explain context limits, cost and model input/output behaviour.",
          "A sentence submitted to an LLM is converted into tokens before the model processes it.",
          [
            "Tokens",
            "Token IDs",
            "Tokenization",
            "Vocabulary",
            "Context length"
          ]
        ),

        topic(
          "embeddings",
          "Embeddings",
          "LLM FUNDAMENTALS",
          "Embeddings represent text or other information as numerical vectors that capture useful relationships.",
          "Embeddings are fundamental to semantic search, recommendation and retrieval systems.",
          "Two documents about similar programming concepts can have similar embedding representations.",
          [
            "Vectors",
            "Semantic similarity",
            "Embedding models",
            "Vector representations",
            "Similarity search"
          ]
        )
      ],

      right: [
        topic(
          "prompt-engineering",
          "Prompt Engineering",
          "LLM APPLICATIONS",
          "Prompt engineering involves designing instructions and context that guide an AI model toward useful outputs.",
          "Well-designed prompts can make AI application behaviour more consistent and useful.",
          "A tutoring application can instruct an LLM to explain a programming problem step by step.",
          [
            "Instructions",
            "Context",
            "Examples",
            "Role prompting",
            "Structured outputs",
            "Prompt testing"
          ]
        ),

        topic(
          "llm-api",
          "LLM APIs",
          "LLM APPLICATIONS",
          "LLM APIs allow applications to send inputs to language models and receive generated outputs.",
          "APIs allow developers to integrate AI capabilities into normal software applications.",
          "A React application can send a student's question to a backend API that calls an LLM.",
          [
            "API requests",
            "Authentication",
            "Messages",
            "Parameters",
            "Streaming",
            "Error handling"
          ]
        )
      ]
    },

    {
      id: "rag",
      title: "Retrieval-Augmented Generation",
      category: "AI APPLICATIONS",

      main: topic(
        "rag",
        "RAG Systems",
        "AI APPLICATIONS",
        "Retrieval-Augmented Generation combines information retrieval with a language model so responses can use relevant external information.",
        "RAG allows AI applications to work with domain-specific knowledge that may not be contained in the model itself.",
        "An engineering college assistant can retrieve information from uploaded college PDFs before generating an answer.",
        [
          "Document ingestion",
          "Chunking",
          "Embeddings",
          "Vector databases",
          "Retrieval",
          "Context injection"
        ]
      ),

      left: [
        topic(
          "document-processing",
          "Document Processing",
          "RAG",
          "Document processing prepares files such as PDFs and text documents so their content can be searched and retrieved.",
          "Poor document processing can reduce the quality of downstream retrieval.",
          "College regulations can be extracted from PDF files and divided into searchable chunks.",
          [
            "PDF extraction",
            "Text cleaning",
            "Chunking",
            "Metadata",
            "Document loaders"
          ]
        ),

        topic(
          "vector-databases",
          "Vector Databases",
          "RAG",
          "Vector databases store numerical representations of information and allow similarity-based retrieval.",
          "They are commonly used to find semantically relevant information for AI applications.",
          "A college assistant can search a vector database for the most relevant section of a student handbook.",
          [
            "Vectors",
            "Similarity search",
            "Indexing",
            "Metadata filtering",
            "Collections"
          ]
        )
      ],

      right: [
        topic(
          "retrieval",
          "Retrieval",
          "RAG",
          "Retrieval selects relevant information from a knowledge base based on a user's query.",
          "The quality of retrieved context strongly affects the usefulness of a RAG system.",
          "A query about exam rules can retrieve the relevant section from a college document.",
          [
            "Semantic search",
            "Similarity",
            "Top-K retrieval",
            "Metadata filtering",
            "Reranking"
          ]
        ),

        topic(
          "rag-evaluation",
          "RAG Evaluation",
          "RAG",
          "RAG evaluation measures whether a system retrieves relevant information and generates useful answers from that information.",
          "Evaluation helps identify retrieval errors and unsupported responses.",
          "A college assistant can be tested against questions whose correct answers are known in the source documents.",
          [
            "Retrieval quality",
            "Answer relevance",
            "Groundedness",
            "Evaluation datasets",
            "Failure analysis"
          ]
        )
      ]
    },

    {
      id: "ai-agents",
      title: "AI Agents",
      category: "ADVANCED",

      main: topic(
        "ai-agents",
        "AI Agents",
        "ADVANCED",
        "AI agents are systems that use models together with tools, memory and workflows to perform multi-step tasks.",
        "Agents extend AI applications beyond simple question-and-answer interactions.",
        "A career assistant could analyse a student's profile, search available resources and generate a personalized learning plan.",
        [
          "Agent loop",
          "Tools",
          "Memory",
          "Planning",
          "Reasoning",
          "Actions"
        ]
      ),

      left: [
        topic(
          "tool-calling",
          "Tool Calling",
          "AI AGENTS",
          "Tool calling allows an AI model to request external functions or services when additional actions or information are required.",
          "Tools allow AI applications to interact with systems outside the language model.",
          "An AI assistant can call a calendar tool to retrieve upcoming events.",
          [
            "Function calling",
            "Tool schemas",
            "Arguments",
            "Tool results",
            "Error handling"
          ]
        ),

        topic(
          "agent-memory",
          "Agent Memory",
          "AI AGENTS",
          "Agent memory allows an AI application to retain relevant information across interactions or during a workflow.",
          "Memory can make multi-step AI interactions more useful and context-aware.",
          "A study assistant can remember the subjects a student is currently learning.",
          [
            "Short-term memory",
            "Long-term memory",
            "Conversation state",
            "Memory retrieval",
            "Memory management"
          ]
        )
      ],

      right: [
        topic(
          "agent-workflows",
          "Agent Workflows",
          "AI AGENTS",
          "Agent workflows define how models, tools and application logic work together to complete multi-step tasks.",
          "Structured workflows make complex AI systems easier to understand, test and maintain.",
          "A career agent can collect profile information, analyse skills and generate a roadmap in multiple steps.",
          [
            "Planning",
            "Task decomposition",
            "Tool execution",
            "State management",
            "Workflow control"
          ]
        ),

        topic(
          "multi-agent-systems",
          "Multi-Agent Systems",
          "ADVANCED AI",
          "Multi-agent systems use multiple specialized AI agents that cooperate to complete a larger task.",
          "Specialized agents can divide complex workflows into manageable responsibilities.",
          "One agent can research a topic while another creates a structured summary.",
          [
            "Agent roles",
            "Communication",
            "Coordination",
            "Task delegation",
            "Shared state"
          ]
        )
      ]
    },

    {
      id: "ai-application-development",
      title: "AI Application Development",
      category: "APPLICATIONS",

      main: topic(
        "ai-app-development",
        "AI Application Development",
        "APPLICATIONS",
        "AI application development combines models, backend services, databases and user interfaces into complete software products.",
        "An AI model becomes useful when it is integrated into a reliable application.",
        "An AI interview platform can combine a React interface, backend API, database and AI evaluation service.",
        [
          "Frontend",
          "Backend",
          "AI APIs",
          "Databases",
          "Authentication",
          "Application logic"
        ]
      ),

      left: [
        topic(
          "ai-backend",
          "AI Backend",
          "APPLICATION DEVELOPMENT",
          "An AI backend manages requests, authentication, model calls, data processing and application logic.",
          "Keeping AI logic on the backend helps organize security and application architecture.",
          "A FastAPI backend can receive a question, retrieve context and call an LLM before returning the response.",
          [
            "REST APIs",
            "FastAPI",
            "Request validation",
            "Authentication",
            "Model integration"
          ]
        ),

        topic(
          "ai-databases",
          "Databases for AI Applications",
          "APPLICATION DEVELOPMENT",
          "Databases store application information such as users, conversations, documents, configurations and model-related data.",
          "Real AI products need persistent application state beyond the model itself.",
          "A tutoring platform can store users, questions and conversation history in a database.",
          [
            "SQL",
            "NoSQL",
            "Schema design",
            "CRUD",
            "Metadata",
            "Data security"
          ]
        )
      ],

      right: [
        topic(
          "ai-frontend",
          "AI Frontend",
          "APPLICATION DEVELOPMENT",
          "The frontend provides the interface through which users interact with AI functionality.",
          "Good AI interfaces need to handle streaming responses, loading states, errors and user feedback.",
          "A chat interface can display an AI response while it is being generated.",
          [
            "React",
            "Chat interfaces",
            "Streaming UI",
            "Loading states",
            "Error handling",
            "User feedback"
          ]
        ),

        topic(
          "ai-auth",
          "Authentication & Authorization",
          "APPLICATION SECURITY",
          "Authentication verifies users while authorization determines what actions or resources they are allowed to access.",
          "AI applications may handle private conversations, documents and user information.",
          "A student platform can allow students to access only their own uploaded documents.",
          [
            "Authentication",
            "Authorization",
            "Sessions",
            "JWT",
            "Access control"
          ]
        )
      ]
    },

    {
      id: "evaluation-safety",
      title: "AI Evaluation & Safety",
      category: "PRODUCTION",

      main: topic(
        "ai-evaluation",
        "AI Evaluation",
        "PRODUCTION",
        "AI evaluation measures whether an AI system produces useful, accurate, relevant and reliable outputs.",
        "Traditional software testing alone is not enough for many AI systems because model outputs can vary.",
        "An AI tutor can be evaluated using a set of questions with expected answer characteristics.",
        [
          "Evaluation datasets",
          "Quality metrics",
          "Human evaluation",
          "Automated evaluation",
          "Failure analysis"
        ]
      ),

      left: [
        topic(
          "hallucinations",
          "Hallucinations",
          "AI SAFETY",
          "An AI hallucination occurs when a model generates information that is unsupported or incorrect.",
          "Understanding hallucinations is important when building systems that users may rely on.",
          "A chatbot may confidently provide an incorrect policy that does not exist in its source documents.",
          [
            "Grounded responses",
            "Source verification",
            "Retrieval",
            "Confidence handling",
            "Failure analysis"
          ]
        ),

        topic(
          "responsible-ai",
          "Responsible AI",
          "AI SAFETY",
          "Responsible AI considers reliability, privacy, fairness, transparency and appropriate use of AI systems.",
          "AI systems can affect users and decisions, so their risks should be considered during development.",
          "A student assessment system should protect personal information and evaluate whether outputs behave consistently.",
          [
            "Privacy",
            "Fairness",
            "Transparency",
            "Safety",
            "Human oversight"
          ]
        )
      ],

      right: [
        topic(
          "guardrails",
          "AI Guardrails",
          "AI SAFETY",
          "Guardrails are application-level controls that help keep AI systems within defined boundaries.",
          "They can reduce unsafe, irrelevant or unintended model behaviour.",
          "A tutoring application can restrict responses to educational topics and reject inappropriate requests.",
          [
            "Input validation",
            "Output validation",
            "Content filtering",
            "Structured outputs",
            "Access controls"
          ]
        )
      ]
    },

    {
      id: "deployment",
      title: "Deployment & MLOps",
      category: "PRODUCTION",

      main: topic(
        "ai-deployment",
        "AI Deployment",
        "PRODUCTION",
        "AI deployment makes models and AI applications available to real users through production infrastructure.",
        "A model has practical value only when users can reliably access it.",
        "A FastAPI service can expose an AI model to a React application through a REST API.",
        [
          "Model serving",
          "REST APIs",
          "FastAPI",
          "Docker",
          "Cloud",
          "Monitoring"
        ]
      ),

      left: [
        topic(
          "model-serving",
          "Model Serving",
          "DEPLOYMENT",
          "Model serving provides an interface through which applications can send input to a trained model and receive predictions.",
          "It connects the trained model to the rest of the software system.",
          "A backend endpoint can receive student information and return a placement prediction.",
          [
            "Inference",
            "API endpoints",
            "Request validation",
            "Serialization",
            "Latency"
          ]
        ),

        topic(
          "docker-ai",
          "Docker",
          "DEVOPS",
          "Docker packages an application and its dependencies into portable containers.",
          "Containerization helps keep development and production environments consistent.",
          "An AI API can be packaged with its Python dependencies inside a Docker container.",
          [
            "Images",
            "Containers",
            "Dockerfile",
            "Volumes",
            "Networking"
          ]
        )
      ],

      right: [
        topic(
          "cloud-ai",
          "Cloud Deployment",
          "CLOUD",
          "Cloud platforms provide infrastructure for hosting AI applications, APIs, databases and supporting services.",
          "Cloud infrastructure allows applications to be accessed by users without running everything locally.",
          "An AI backend can be deployed to a cloud server and connected to a hosted database.",
          [
            "Compute",
            "Storage",
            "Networking",
            "Managed databases",
            "Environment variables",
            "Scaling"
          ]
        ),

        topic(
          "monitoring",
          "Monitoring",
          "MLOPS",
          "Monitoring tracks application and model behaviour after deployment.",
          "Production systems can change over time and require continuous observation.",
          "An AI application can monitor API latency, error rates and model response quality.",
          [
            "Logs",
            "Metrics",
            "Latency",
            "Errors",
            "Model performance",
            "Alerts"
          ]
        )
      ]
    },

    {
      id: "projects",
      title: "Build Real AI Projects",
      category: "BUILD",

      main: topic(
        "ai-projects",
        "Real-World AI Projects",
        "BUILD",
        "Projects combine AI concepts into complete applications that solve practical problems.",
        "Building projects demonstrates that you can integrate models, data, software and deployment rather than only studying individual concepts.",
        "Build an AI student assistant using React, a backend API, an LLM, RAG and a vector database.",
        [
          "Problem Definition",
          "Data",
          "AI Model",
          "Backend",
          "Frontend",
          "Evaluation",
          "Deployment"
        ]
      ),

      left: [
        topic(
          "rag-project",
          "Build a RAG Application",
          "PROJECT",
          "Create an application that answers questions using information retrieved from a custom knowledge base.",
          "This project demonstrates document processing, embeddings, retrieval and LLM integration.",
          "Build a college-document assistant that answers questions from uploaded PDFs.",
          [
            "Document ingestion",
            "Chunking",
            "Embeddings",
            "Vector database",
            "Retrieval",
            "LLM"
          ]
        ),

        topic(
          "ai-agent-project",
          "Build an AI Agent",
          "PROJECT",
          "Create an AI system that can use tools and execute a multi-step workflow.",
          "This demonstrates how modern AI applications go beyond simple chatbot interactions.",
          "Build a career assistant that analyses a student's profile and generates a personalized learning plan.",
          [
            "Agent",
            "Tools",
            "Memory",
            "Planning",
            "Workflow",
            "Evaluation"
          ]
        )
      ],

      right: [
        topic(
          "ai-fullstack-project",
          "Build a Full-Stack AI Product",
          "PROJECT",
          "Combine a frontend, backend, database and AI capability into one complete application.",
          "This demonstrates software engineering and AI integration skills together.",
          "Build an AI interview platform with React, backend APIs, database storage and AI feedback.",
          [
            "React",
            "Backend",
            "Database",
            "Authentication",
            "AI API",
            "Deployment"
          ]
        )
      ]
    }
  ]
},

  "web-development": {
  id: "web-development",
  title: "Web Development Roadmap",
  description:
    "A complete path from web fundamentals to frontend, backend, databases, full-stack development, security and production deployment.",
  sections: [
    // =========================================================
    // 1. WEB FOUNDATIONS
    // =========================================================
    {
      id: "web-foundations",
      title: "Web Foundations",
      category: "START",
      main: topic(
        "web-foundations",
        "Web Foundations",
        "START",
        "Understand how websites work, how browsers communicate with servers, and how HTML, CSS and JavaScript work together.",
        "These concepts form the foundation of everything you build on the web.",
        "When you open a website, the browser requests resources from a server and renders the returned HTML, CSS and JavaScript.",
        [
          "How the Web works",
          "Client and server",
          "Browsers",
          "HTTP and HTTPS",
          "URLs and DNS",
          "Frontend vs backend",
          "Web standards"
        ]
      ),

      left: [
        topic(
          "how-web-works",
          "How the Web Works",
          "FOUNDATION",
          "Learn how a browser communicates with servers and how web pages are delivered to users.",
          "Understanding the request-response cycle helps you debug frontend and backend problems.",
          "A browser sends an HTTP request to a server and receives HTML, CSS, JavaScript or other resources.",
          [
            "Client-server model",
            "Request-response cycle",
            "Browser rendering",
            "HTTP methods",
            "HTTP status codes"
          ]
        ),

        topic(
          "http-https",
          "HTTP & HTTPS",
          "FOUNDATION",
          "Learn the protocol used for communication between browsers and web servers.",
          "APIs, authentication and almost every modern web application depend on HTTP.",
          "A login form may send a POST request to a backend API over HTTPS.",
          [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "Status codes",
            "Headers",
            "HTTPS"
          ]
        )
      ],

      right: [
        topic(
          "client-server",
          "Client & Server",
          "FOUNDATION",
          "Understand the responsibilities of the frontend client and backend server.",
          "This distinction becomes important when building full-stack applications.",
          "React can run in the browser while Node.js handles API requests on the server.",
          [
            "Frontend",
            "Backend",
            "Server",
            "API",
            "Database",
            "Request flow"
          ]
        ),

        topic(
          "dns-url",
          "DNS & URLs",
          "FOUNDATION",
          "Learn how domain names are resolved and how URLs identify resources on the web.",
          "Useful when deploying applications and configuring domains.",
          "When a user enters example.com, DNS helps locate the server associated with that domain.",
          [
            "Domain names",
            "DNS",
            "URL structure",
            "IP addresses",
            "Ports"
          ]
        )
      ]
    },

    // =========================================================
    // 2. HTML
    // =========================================================
    {
      id: "html",
      title: "HTML",
      category: "FRONTEND",
      main: topic(
        "html",
        "HTML",
        "FRONTEND",
        "Learn how to structure web pages using semantic HTML elements.",
        "HTML provides the structure and meaning of web content.",
        "A portfolio page can use headings, sections, navigation, images, links and forms.",
        [
          "HTML syntax",
          "Elements",
          "Attributes",
          "Semantic HTML",
          "Forms",
          "Tables",
          "Multimedia"
        ]
      ),

      left: [
        topic(
          "html-basics",
          "HTML Basics",
          "HTML",
          "Learn elements, attributes, headings, paragraphs, lists, links and images.",
          "These are the building blocks used in almost every web page.",
          "Creating a personal portfolio with headings, images and navigation links.",
          [
            "Elements",
            "Attributes",
            "Headings",
            "Paragraphs",
            "Lists",
            "Links",
            "Images"
          ]
        ),

        topic(
          "semantic-html",
          "Semantic HTML",
          "HTML",
          "Use meaningful HTML elements that describe the purpose of content.",
          "Semantic markup improves accessibility, maintainability and document structure.",
          "Using <header>, <nav>, <main>, <section> and <footer> instead of generic divs everywhere.",
          [
            "header",
            "nav",
            "main",
            "section",
            "article",
            "aside",
            "footer"
          ]
        )
      ],

      right: [
        topic(
          "html-forms",
          "Forms & Validation",
          "HTML",
          "Learn how to collect user input using HTML forms and validation attributes.",
          "Forms are essential for login, registration, search and data-entry applications.",
          "A signup form can validate required fields before submitting data.",
          [
            "form",
            "input",
            "textarea",
            "select",
            "button",
            "required",
            "input types"
          ]
        ),

        topic(
          "html-accessibility",
          "HTML Accessibility",
          "HTML",
          "Learn how to structure pages so that users with different abilities can interact with them.",
          "Accessibility is an important part of professional web development.",
          "Using labels correctly allows screen-reader users to understand form fields.",
          [
            "Labels",
            "Alt text",
            "Semantic elements",
            "Keyboard navigation",
            "Accessible forms"
          ]
        )
      ]
    },

    // =========================================================
    // 3. CSS
    // =========================================================
    {
      id: "css",
      title: "CSS & Responsive Design",
      category: "FRONTEND",
      main: topic(
        "css",
        "CSS",
        "FRONTEND",
        "Learn how to style websites, create layouts, animations and responsive interfaces.",
        "CSS transforms structured HTML into usable and visually polished interfaces.",
        "A responsive dashboard can automatically adapt from desktop to mobile screens.",
        [
          "Selectors",
          "Box model",
          "Flexbox",
          "Grid",
          "Positioning",
          "Responsive design",
          "Animations"
        ]
      ),

      left: [
        topic(
          "css-basics",
          "CSS Fundamentals",
          "CSS",
          "Learn selectors, properties, inheritance, specificity and the CSS box model.",
          "These concepts are required to control the appearance and layout of elements.",
          "Changing the spacing, typography and borders of a profile card.",
          [
            "Selectors",
            "Properties",
            "Specificity",
            "Inheritance",
            "Box model",
            "Units"
          ]
        ),

        topic(
          "flexbox",
          "Flexbox",
          "CSS",
          "Learn one-dimensional layouts using CSS Flexbox.",
          "Flexbox is widely used for navigation bars, cards, buttons and component layouts.",
          "Centering a login form vertically and horizontally.",
          [
            "Flex container",
            "Flex items",
            "justify-content",
            "align-items",
            "gap",
            "flex-direction"
          ]
        )
      ],

      right: [
        topic(
          "css-grid",
          "CSS Grid",
          "CSS",
          "Learn two-dimensional layouts using CSS Grid.",
          "Grid is useful for dashboards, galleries and complex page layouts.",
          "Creating a dashboard containing multiple responsive statistic cards.",
          [
            "Grid container",
            "Grid columns",
            "Grid rows",
            "Gap",
            "Responsive grids"
          ]
        ),

        topic(
          "responsive-design",
          "Responsive Design",
          "CSS",
          "Build interfaces that work across mobile, tablet and desktop screens.",
          "Users access websites from many screen sizes and devices.",
          "A navigation sidebar can collapse into a mobile menu on smaller screens.",
          [
            "Media queries",
            "Mobile-first design",
            "Breakpoints",
            "Flexible layouts",
            "Responsive images"
          ]
        )
      ]
    },

    // =========================================================
    // 4. JAVASCRIPT
    // =========================================================
    {
      id: "javascript",
      title: "JavaScript",
      category: "CORE",
      main: topic(
        "javascript",
        "JavaScript",
        "CORE",
        "Learn JavaScript to add logic, interactivity and dynamic behavior to web applications.",
        "JavaScript is the core programming language of the modern web.",
        "A shopping cart can update the total price immediately when a product quantity changes.",
        [
          "Variables",
          "Functions",
          "Arrays",
          "Objects",
          "DOM",
          "Events",
          "Async JavaScript"
        ]
      ),

      left: [
        topic(
          "js-fundamentals",
          "JavaScript Fundamentals",
          "JAVASCRIPT",
          "Learn variables, data types, operators, conditions, loops and functions.",
          "These concepts form the programming foundation for frontend development.",
          "A function can calculate the total price of products in a cart.",
          [
            "let and const",
            "Data types",
            "Operators",
            "Conditions",
            "Loops",
            "Functions"
          ]
        ),

        topic(
          "js-arrays-objects",
          "Arrays & Objects",
          "JAVASCRIPT",
          "Learn how to store and manipulate structured data.",
          "Most frontend applications work with collections of objects received from APIs.",
          "A list of students can be represented as an array of student objects.",
          [
            "Arrays",
            "Objects",
            "map",
            "filter",
            "reduce",
            "Destructuring"
          ]
        )
      ],

      right: [
        topic(
          "dom-events",
          "DOM & Events",
          "JAVASCRIPT",
          "Learn how JavaScript interacts with HTML elements and browser events.",
          "The DOM allows applications to respond to user actions.",
          "Clicking a button can open a modal or update content on the page.",
          [
            "DOM",
            "querySelector",
            "Event listeners",
            "Forms",
            "Event handling"
          ]
        ),

        topic(
          "async-js",
          "Asynchronous JavaScript",
          "JAVASCRIPT",
          "Learn promises, async/await and asynchronous operations.",
          "Modern applications frequently communicate with APIs asynchronously.",
          "Fetching student data from a backend API using async/await.",
          [
            "Callbacks",
            "Promises",
            "async",
            "await",
            "Error handling"
          ]
        )
      ]
    },

    // =========================================================
    // 5. WEB APIs
    // =========================================================
    {
      id: "web-apis",
      title: "Web APIs & Browser Features",
      category: "CORE",
      main: topic(
        "web-apis",
        "Web APIs",
        "CORE",
        "Learn browser-provided APIs that allow websites to interact with network requests, storage and device capabilities.",
        "Web APIs allow applications to perform tasks beyond basic HTML rendering.",
        "An application can store user preferences in localStorage and retrieve data from an API.",
        [
          "Fetch API",
          "Web Storage",
          "JSON",
          "Browser APIs",
          "Client-side data"
        ]
      ),

      left: [
        topic(
          "fetch-api",
          "Fetch API",
          "WEB API",
          "Learn how to send HTTP requests from the browser.",
          "Fetching data from APIs is fundamental to modern frontend applications.",
          "A dashboard requests student profile data from a backend API.",
          [
            "fetch",
            "GET requests",
            "POST requests",
            "JSON",
            "Error handling"
          ]
        ),

        topic(
          "web-storage",
          "Web Storage",
          "WEB API",
          "Learn localStorage and sessionStorage for storing client-side data.",
          "Useful for preferences, temporary state and simple client-side persistence.",
          "Saving a user's theme preference in localStorage.",
          [
            "localStorage",
            "sessionStorage",
            "JSON.stringify",
            "JSON.parse"
          ]
        )
      ],

      right: [
        topic(
          "json",
          "JSON",
          "WEB API",
          "Learn the standard data format commonly used between frontend and backend applications.",
          "Most REST APIs exchange data using JSON.",
          "A backend can return student information as a JSON object.",
          [
            "Objects",
            "Arrays",
            "Parsing",
            "Serialization",
            "API responses"
          ]
        ),

        topic(
          "browser-devtools",
          "Browser DevTools",
          "TOOLS",
          "Learn how to inspect, debug and analyze websites using browser developer tools.",
          "DevTools dramatically improves debugging speed.",
          "Inspecting a failed API request in the Network tab.",
          [
            "Elements",
            "Console",
            "Network",
            "Application",
            "Sources",
            "Performance"
          ]
        )
      ]
    },

    // =========================================================
    // 6. REACT
    // =========================================================
    {
      id: "react",
      title: "React",
      category: "FRAMEWORK",
      main: topic(
        "react",
        "React",
        "FRAMEWORK",
        "Learn component-based UI development using React.",
        "React helps developers build complex interfaces from reusable components.",
        "EngineerOS can be divided into reusable components such as Sidebar, DashboardCard and RoadmapNode.",
        [
          "Components",
          "JSX",
          "Props",
          "State",
          "Events",
          "Hooks",
          "Routing"
        ]
      ),

      left: [
        topic(
          "react-components",
          "Components & JSX",
          "REACT",
          "Learn how to create reusable UI components using JSX.",
          "Component-based architecture makes large interfaces easier to maintain.",
          "A reusable Button component can be used across multiple pages.",
          [
            "Components",
            "JSX",
            "Props",
            "Children",
            "Reusable UI"
          ]
        ),

        topic(
          "react-state",
          "State & Hooks",
          "REACT",
          "Learn React state and hooks such as useState and useEffect.",
          "State allows components to respond to user interaction and changing data.",
          "A form can store user input using useState.",
          [
            "useState",
            "useEffect",
            "State updates",
            "Controlled inputs",
            "Custom hooks"
          ]
        )
      ],

      right: [
        topic(
          "react-routing",
          "React Routing",
          "REACT",
          "Learn client-side routing for multi-page-like React applications.",
          "Routing allows applications to provide separate views without full page reloads.",
          "EngineerOS uses routes for Dashboard, Profile, Roadmap and Placement Prediction.",
          [
            "Routes",
            "Route parameters",
            "Nested routes",
            "Navigation",
            "Protected routes"
          ]
        ),

        topic(
          "react-state-management",
          "State Management",
          "REACT",
          "Learn approaches for managing application-wide state.",
          "Large applications often need shared data across multiple components.",
          "User authentication information can be shared between the navbar and dashboard.",
          [
            "Context API",
            "Global state",
            "Reducers",
            "Zustand",
            "Redux"
          ]
        )
      ]
    },

    // =========================================================
    // 7. TYPESCRIPT & FRONTEND ENGINEERING
    // =========================================================
    {
      id: "frontend-engineering",
      title: "Frontend Engineering",
      category: "ADVANCED",
      main: topic(
        "frontend-engineering",
        "Frontend Engineering",
        "ADVANCED",
        "Learn how to build scalable, maintainable and production-ready frontend applications.",
        "Professional applications require more than basic UI development.",
        "A large dashboard can be organized into typed components, reusable utilities and feature-based folders.",
        [
          "TypeScript",
          "Component architecture",
          "Performance",
          "Accessibility",
          "Testing"
        ]
      ),

      left: [
        topic(
          "typescript",
          "TypeScript",
          "FRONTEND",
          "Learn static typing for JavaScript applications.",
          "Types can catch many errors before the application runs and improve developer tooling.",
          "A ProfileData interface can ensure every profile field has the expected type.",
          [
            "Types",
            "Interfaces",
            "Generics",
            "Union types",
            "Type inference"
          ]
        ),

        topic(
          "frontend-architecture",
          "Frontend Architecture",
          "FRONTEND",
          "Learn how to structure large frontend applications into reusable and maintainable modules.",
          "Good architecture reduces duplication and makes applications easier to extend.",
          "Separating pages, components, hooks, utilities and API services.",
          [
            "Folder structure",
            "Reusable components",
            "Hooks",
            "Services",
            "Separation of concerns"
          ]
        )
      ],

      right: [
        topic(
          "frontend-performance",
          "Frontend Performance",
          "FRONTEND",
          "Learn techniques for making websites load and respond efficiently.",
          "Performance directly affects user experience.",
          "Lazy-loading a large dashboard page only when the user opens it.",
          [
            "Code splitting",
            "Lazy loading",
            "Image optimization",
            "Caching",
            "Rendering performance"
          ]
        ),

        topic(
          "accessibility",
          "Accessibility",
          "FRONTEND",
          "Build interfaces that can be used by people with different abilities.",
          "Accessibility is part of professional web development and inclusive design.",
          "A keyboard user should be able to navigate a form without a mouse.",
          [
            "Semantic HTML",
            "Keyboard navigation",
            "ARIA",
            "Focus management",
            "Accessible forms"
          ]
        )
      ]
    },

    // =========================================================
    // 8. BACKEND
    // =========================================================
    {
      id: "backend",
      title: "Backend Development",
      category: "BACKEND",
      main: topic(
        "backend",
        "Backend Development",
        "BACKEND",
        "Learn how servers process requests, implement business logic and communicate with databases.",
        "The backend provides the services and data that power full-stack applications.",
        "A placement prediction application can send student information to a backend API for processing.",
        [
          "Node.js",
          "Express",
          "REST APIs",
          "Middleware",
          "Authentication"
        ]
      ),

      left: [
        topic(
          "nodejs",
          "Node.js",
          "BACKEND",
          "Learn JavaScript runtime development on the server.",
          "Node.js allows frontend developers to use JavaScript for backend development.",
          "A Node.js server can expose an API for a React application.",
          [
            "Node runtime",
            "Modules",
            "npm",
            "File system",
            "Environment variables"
          ]
        ),

        topic(
          "express",
          "Express.js",
          "BACKEND",
          "Learn how to build APIs and server applications using Express.",
          "Express provides a lightweight way to create backend APIs.",
          "An Express route can return a student's profile data.",
          [
            "Routes",
            "Middleware",
            "Controllers",
            "Request",
            "Response"
          ]
        )
      ],

      right: [
        topic(
          "rest-api",
          "REST APIs",
          "BACKEND",
          "Learn how to design APIs that allow frontend and backend systems to communicate.",
          "APIs connect different parts of modern applications.",
          "A GET /students/:id endpoint can return a student's profile.",
          [
            "Resources",
            "HTTP methods",
            "Status codes",
            "Endpoints",
            "JSON responses"
          ]
        ),

        topic(
          "backend-auth",
          "Backend Authentication",
          "BACKEND",
          "Learn how servers verify users and protect application resources.",
          "Authentication is essential for applications containing private user data.",
          "A backend can verify a login token before returning profile information.",
          [
            "Sessions",
            "JWT",
            "Password hashing",
            "Authorization",
            "Protected routes"
          ]
        )
      ]
    },

    // =========================================================
    // 9. DATABASES
    // =========================================================
    {
      id: "databases",
      title: "Databases",
      category: "BACKEND",
      main: topic(
        "databases",
        "Databases",
        "BACKEND",
        "Learn how applications store, retrieve and organize persistent data.",
        "Most real-world applications require reliable data storage.",
        "EngineerOS could store profiles, assessment results and roadmap progress in a database.",
        [
          "SQL",
          "Relational databases",
          "NoSQL",
          "CRUD",
          "Database design"
        ]
      ),

      left: [
        topic(
          "sql",
          "SQL",
          "DATABASE",
          "Learn how to query and manipulate relational data.",
          "SQL is widely used for structured application data.",
          "Querying all students whose CGPA is greater than 8.",
          [
            "SELECT",
            "INSERT",
            "UPDATE",
            "DELETE",
            "WHERE",
            "JOIN"
          ]
        ),

        topic(
          "postgresql-mysql",
          "PostgreSQL / MySQL",
          "DATABASE",
          "Learn practical relational database systems used in web applications.",
          "These databases are common choices for structured application data.",
          "A university application can store students, courses and enrollments in relational tables.",
          [
            "Tables",
            "Primary keys",
            "Foreign keys",
            "Relationships",
            "Indexes"
          ]
        )
      ],

      right: [
        topic(
          "mongodb",
          "MongoDB",
          "DATABASE",
          "Learn document-oriented database concepts using MongoDB.",
          "Document databases can be useful when application data has flexible structures.",
          "A profile document can contain nested student information.",
          [
            "Documents",
            "Collections",
            "CRUD",
            "Queries",
            "Indexes"
          ]
        ),

        topic(
          "database-design",
          "Database Design",
          "DATABASE",
          "Learn how to structure application data efficiently.",
          "Good database design reduces duplication and improves data consistency.",
          "Separating users, profiles and assessment results into related collections or tables.",
          [
            "Normalization",
            "Relationships",
            "Indexes",
            "Constraints",
            "Data modeling"
          ]
        )
      ]
    },

    // =========================================================
    // 10. FULL STACK
    // =========================================================
    {
      id: "full-stack",
      title: "Full-Stack Development",
      category: "APPLICATIONS",
      main: topic(
        "full-stack",
        "Full-Stack Development",
        "APPLICATIONS",
        "Combine frontend, backend and database technologies to build complete web applications.",
        "Full-stack development allows you to build an application from interface to data layer.",
        "A student platform can have React frontend, Node.js backend and PostgreSQL database.",
        [
          "Frontend",
          "Backend",
          "Database",
          "API integration",
          "Authentication"
        ]
      ),

      left: [
        topic(
          "api-integration",
          "API Integration",
          "FULL STACK",
          "Connect frontend applications with backend APIs.",
          "This is how data flows between the user interface and server.",
          "React sends a request to retrieve a student's roadmap progress.",
          [
            "Fetch",
            "API clients",
            "Loading states",
            "Error states",
            "JSON"
          ]
        ),

        topic(
          "fullstack-auth",
          "Full-Stack Authentication",
          "FULL STACK",
          "Connect frontend login flows with backend authentication.",
          "Authentication must work across both client and server.",
          "A user logs in, receives an authentication token and accesses protected pages.",
          [
            "Login",
            "Signup",
            "Tokens",
            "Protected routes",
            "Authorization"
          ]
        )
      ],

      right: [
        topic(
          "file-upload",
          "File Uploads",
          "FULL STACK",
          "Learn how applications upload and process files.",
          "Documents and images are common requirements in real applications.",
          "A student can upload a resume to their profile.",
          [
            "Multipart forms",
            "File validation",
            "Storage",
            "Upload APIs"
          ]
        ),

        topic(
          "fullstack-project",
          "Production Architecture",
          "FULL STACK",
          "Learn how frontend, backend and database layers communicate in a production application.",
          "Understanding the complete architecture helps you build scalable projects.",
          "A deployed application can have a frontend, API server and managed database.",
          [
            "Frontend",
            "API",
            "Database",
            "Environment variables",
            "Deployment"
          ]
        )
      ]
    },

    // =========================================================
    // 11. SECURITY
    // =========================================================
    {
      id: "web-security",
      title: "Web Security",
      category: "SECURITY",
      main: topic(
        "web-security",
        "Web Security",
        "SECURITY",
        "Learn how to protect web applications, user accounts and data from common attacks.",
        "Security should be considered throughout application development.",
        "A web application should validate user input and protect authenticated API endpoints.",
        [
          "HTTPS",
          "Authentication",
          "Authorization",
          "Input validation",
          "OWASP"
        ]
      ),

      left: [
        topic(
          "cors",
          "CORS",
          "SECURITY",
          "Understand how browsers control cross-origin requests.",
          "CORS commonly appears when frontend and backend applications run on different origins.",
          "A React frontend on one domain may need permission to call an API on another domain.",
          [
            "Origins",
            "CORS headers",
            "Preflight",
            "Access-Control-Allow-Origin"
          ]
        ),

        topic(
          "input-validation",
          "Input Validation",
          "SECURITY",
          "Learn how to validate and sanitize user-provided data.",
          "Untrusted input can create security and reliability problems.",
          "A registration API validates email, password and other fields before storing them.",
          [
            "Validation",
            "Sanitization",
            "Schema validation",
            "Server-side validation"
          ]
        )
      ],

      right: [
        topic(
          "owasp",
          "OWASP Fundamentals",
          "SECURITY",
          "Learn common web application security risks and defensive practices.",
          "Understanding common vulnerabilities helps developers avoid insecure implementations.",
          "Protecting an application from injection and broken access control.",
          [
            "Injection",
            "Broken access control",
            "Authentication failures",
            "Security misconfiguration"
          ]
        ),

        topic(
          "secure-auth",
          "Secure Authentication",
          "SECURITY",
          "Learn secure approaches for passwords, sessions and tokens.",
          "Authentication protects private user accounts and application data.",
          "Passwords should be securely hashed rather than stored as plain text.",
          [
            "Password hashing",
            "Sessions",
            "JWT",
            "Cookies",
            "Authorization"
          ]
        )
      ]
    },

    // =========================================================
    // 12. TESTING
    // =========================================================
    {
      id: "testing",
      title: "Testing",
      category: "QUALITY",
      main: topic(
        "testing",
        "Web Application Testing",
        "QUALITY",
        "Learn how to verify that frontend, backend and full-stack applications behave correctly.",
        "Testing reduces regressions and makes applications more reliable.",
        "A login component can be tested to ensure invalid credentials display an error.",
        [
          "Unit testing",
          "Integration testing",
          "API testing",
          "End-to-end testing"
        ]
      ),

      left: [
        topic(
          "unit-testing",
          "Unit Testing",
          "TESTING",
          "Test individual functions or components in isolation.",
          "Unit tests help catch bugs early.",
          "Testing a utility function that calculates a student's progress percentage.",
          [
            "Test cases",
            "Assertions",
            "Mocks",
            "Component testing"
          ]
        ),

        topic(
          "api-testing",
          "API Testing",
          "TESTING",
          "Test backend endpoints and their responses.",
          "API testing helps verify that frontend-backend communication works correctly.",
          "Testing whether POST /login returns the correct response for valid credentials.",
          [
            "Endpoints",
            "Requests",
            "Responses",
            "Status codes",
            "Postman"
          ]
        )
      ],

      right: [
        topic(
          "integration-testing",
          "Integration Testing",
          "TESTING",
          "Test how multiple application components work together.",
          "Integration bugs can occur even when individual components work correctly.",
          "Testing whether a form successfully sends data to the backend and updates the UI.",
          [
            "Component integration",
            "API integration",
            "Database integration"
          ]
        ),

        topic(
          "e2e-testing",
          "End-to-End Testing",
          "TESTING",
          "Test complete user journeys through the application.",
          "E2E tests simulate real user interactions.",
          "Testing the complete flow from signup to dashboard.",
          [
            "User journeys",
            "Browser automation",
            "Assertions",
            "Test environments"
          ]
        )
      ]
    },

    // =========================================================
    // 13. GIT & COLLABORATION
    // =========================================================
    {
      id: "git",
      title: "Git & Collaboration",
      category: "TOOLS",
      main: topic(
        "git",
        "Git & GitHub",
        "TOOLS",
        "Learn version control and collaborative software development workflows.",
        "Git is essential for managing source code and collaborating with development teams.",
        "A team can create branches for features and merge completed work into the main branch.",
        [
          "Git",
          "GitHub",
          "Branches",
          "Commits",
          "Pull requests"
        ]
      ),

      left: [
        topic(
          "git-basics",
          "Git Basics",
          "GIT",
          "Learn how to track changes and manage versions of your code.",
          "Version control protects your work and makes development history manageable.",
          "Commit changes after implementing a new dashboard feature.",
          [
            "git init",
            "git add",
            "git commit",
            "git status",
            "git log"
          ]
        ),

        topic(
          "git-branches",
          "Branches & Merging",
          "GIT",
          "Learn how to work on multiple features without disturbing the main codebase.",
          "Branches are essential for team development.",
          "Create a feature/profile branch before implementing the profile page.",
          [
            "Branches",
            "Checkout",
            "Merge",
            "Rebase",
            "Conflict resolution"
          ]
        )
      ],

      right: [
        topic(
          "github",
          "GitHub",
          "COLLABORATION",
          "Learn how to host repositories and collaborate with other developers.",
          "GitHub is commonly used for code hosting and team workflows.",
          "A project team can maintain issues and pull requests in a GitHub repository.",
          [
            "Repositories",
            "Issues",
            "Pull requests",
            "Code review",
            "README"
          ]
        ),

        topic(
          "code-review",
          "Code Review",
          "COLLABORATION",
          "Learn how developers review code before it becomes part of the main project.",
          "Code review improves quality and encourages consistent development practices.",
          "A teammate reviews a pull request before it is merged.",
          [
            "Pull requests",
            "Review comments",
            "Approval",
            "Merge"
          ]
        )
      ]
    },

    // =========================================================
    // 14. DEPLOYMENT
    // =========================================================
    {
      id: "deployment",
      title: "Deployment & DevOps",
      category: "PRODUCTION",
      main: topic(
        "deployment",
        "Deployment",
        "PRODUCTION",
        "Learn how to take a web application from local development to a publicly accessible production environment.",
        "A project becomes useful to real users when it can be reliably deployed.",
        "Deploy a React frontend and backend API to cloud platforms.",
        [
          "Build process",
          "Environment variables",
          "Hosting",
          "Domains",
          "CI/CD"
        ]
      ),

      left: [
        topic(
          "hosting",
          "Web Hosting",
          "DEPLOYMENT",
          "Learn how to host frontend and backend applications.",
          "Hosting makes applications accessible over the internet.",
          "Deploying a React application to a cloud hosting platform.",
          [
            "Static hosting",
            "Server hosting",
            "Build commands",
            "Environment variables"
          ]
        ),

        topic(
          "docker",
          "Docker",
          "DEVOPS",
          "Learn how to package applications and their dependencies into containers.",
          "Containers help create consistent development and deployment environments.",
          "A Node.js API can run inside a Docker container.",
          [
            "Images",
            "Containers",
            "Dockerfile",
            "Ports",
            "Docker Compose"
          ]
        )
      ],

      right: [
        topic(
          "ci-cd",
          "CI/CD",
          "DEVOPS",
          "Learn how automated workflows can build, test and deploy applications.",
          "Automation makes software delivery faster and more reliable.",
          "A GitHub push can trigger automated tests and deployment.",
          [
            "Continuous integration",
            "Continuous deployment",
            "Build pipelines",
            "Automated tests"
          ]
        ),

        topic(
          "environment-config",
          "Environment Configuration",
          "DEPLOYMENT",
          "Learn how to safely configure applications across development and production environments.",
          "Applications often require different API URLs, database credentials and secrets.",
          "A production database URL can be provided through an environment variable.",
          [
            "Environment variables",
            ".env",
            "Secrets",
            "Development",
            "Production"
          ]
        )
      ]
    },

    // =========================================================
    // 15. REAL PROJECTS
    // =========================================================
    {
      id: "web-projects",
      title: "Build Real Web Projects",
      category: "BUILD",
      main: topic(
        "web-projects",
        "Real-World Web Projects",
        "BUILD",
        "Apply your knowledge by building complete web applications from idea to deployment.",
        "Projects demonstrate that you can apply concepts rather than only learn them theoretically.",
        "Build and deploy a full-stack student career platform with authentication, database and APIs.",
        [
          "Planning",
          "UI design",
          "Frontend",
          "Backend",
          "Database",
          "Deployment"
        ]
      ),

      left: [
        topic(
          "portfolio-project",
          "Portfolio Website",
          "PROJECT",
          "Build a personal portfolio showcasing your skills, projects and experience.",
          "A portfolio gives recruiters a place to understand your work.",
          "Create a responsive developer portfolio with project cards and contact information.",
          [
            "Responsive UI",
            "Projects",
            "About section",
            "Contact form",
            "Deployment"
          ]
        ),

       topic(
  "ecommerce-project",
  "E-Commerce Application",
  "PROJECT",
  "Build an application with products, authentication, cart and order functionality.",
  "This project exposes you to many real-world application concepts.",
  "An online store where users browse products, add items to a cart and place orders.",
  [
    "Product catalog",
    "Authentication",
    "Cart",
    "Orders",
    "Database",
    "Payments"
  ]
)
      ],

      right: [
        topic(
          "saas-project",
          "SaaS Application",
          "PROJECT",
          "Build a multi-user web application with authentication, dashboards and subscription-style features.",
          "SaaS projects demonstrate stronger full-stack architecture.",
          "A project-management platform where users create workspaces and manage tasks.",
          [
            "Authentication",
            "Dashboard",
            "User roles",
            "Database",
            "API",
            "Deployment"
          ]
        ),

        topic(
          "fullstack-capstone",
          "Full-Stack Capstone",
          "PROJECT",
          "Build one complete production-style application combining everything learned in the roadmap.",
          "A strong capstone demonstrates frontend, backend, database, security and deployment skills.",
          "Build an AI-powered student career platform such as EngineerOS.",
          [
            "React",
            "Backend API",
            "Database",
            "Authentication",
            "Testing",
            "Deployment"
          ]
        )
      ]
    }
  ]
},
"software-development": {
  id: "software-development",
  title: "Software Development Roadmap",
  description:
    "A structured path from programming fundamentals to software engineering, system design, testing, version control and production development.",

  sections: [
    // =========================================================
    // 1. PROGRAMMING FUNDAMENTALS
    // =========================================================
    {
      id: "programming-fundamentals",
      title: "Programming Fundamentals",
      category: "START",

      main: topic(
        "programming-fundamentals",
        "Programming Fundamentals",
        "START",
        "Learn the fundamental concepts required to write programs and solve computational problems.",
        "Strong programming fundamentals make it easier to learn frameworks, databases and advanced software engineering concepts.",
        "A student can use variables, conditions and functions to build a simple student management program.",
        [
          "Variables",
          "Data Types",
          "Conditions",
          "Loops",
          "Functions",
          "Input and Output"
        ]
      ),

      left: [
        topic(
          "programming-syntax",
          "Programming Syntax",
          "FOUNDATION",
          "Learn how programming languages represent instructions, data and operations.",
          "Understanding syntax allows you to write valid and readable programs.",
          "Writing a Java program that accepts student marks and calculates the percentage.",
          [
            "Variables",
            "Operators",
            "Statements",
            "Expressions",
            "Comments"
          ]
        ),

        topic(
          "functions",
          "Functions",
          "FOUNDATION",
          "Learn how to divide a program into reusable blocks of logic.",
          "Functions reduce code duplication and improve program organization.",
          "A calculateAverage() function can calculate the average marks of a student.",
          [
            "Parameters",
            "Arguments",
            "Return values",
            "Scope",
            "Reusable functions"
          ]
        )
      ],

      right: [
        topic(
          "control-flow",
          "Control Flow",
          "FOUNDATION",
          "Learn how programs make decisions and repeat operations.",
          "Control flow is required to implement almost every meaningful program.",
          "An application can check whether a student's CGPA satisfies a placement cutoff.",
          [
            "if-else",
            "switch",
            "for loop",
            "while loop",
            "Nested loops"
          ]
        ),

        topic(
          "error-handling",
          "Error Handling",
          "FOUNDATION",
          "Learn how to detect and handle errors without unexpectedly terminating applications.",
          "Real-world software must handle invalid input and unexpected situations.",
          "A login system can display an error when incorrect credentials are entered.",
          [
            "Exceptions",
            "Try-catch",
            "Validation",
            "Error messages",
            "Logging"
          ]
        )
      ]
    },

    // =========================================================
    // 2. OBJECT ORIENTED PROGRAMMING
    // =========================================================
    {
      id: "oop",
      title: "Object-Oriented Programming",
      category: "CORE",

      main: topic(
        "oop",
        "Object-Oriented Programming",
        "CORE",
        "Learn how software can be structured using classes, objects and reusable components.",
        "OOP is widely used in large software applications and is important for understanding enterprise codebases.",
        "A banking application can represent accounts and customers using classes and objects.",
        [
          "Classes",
          "Objects",
          "Encapsulation",
          "Inheritance",
          "Polymorphism",
          "Abstraction"
        ]
      ),

      left: [
        topic(
          "classes-objects",
          "Classes & Objects",
          "OOP",
          "Learn how classes define structures and objects represent instances of those structures.",
          "Classes help organize related data and behaviour.",
          "A Student class can contain name, CGPA and branch information.",
          [
            "Class",
            "Object",
            "Attributes",
            "Methods",
            "Constructors"
          ]
        ),

        topic(
          "encapsulation",
          "Encapsulation",
          "OOP",
          "Learn how data and behaviour can be grouped together while controlling access to internal details.",
          "Encapsulation helps protect application state and improves maintainability.",
          "A BankAccount class can prevent direct modification of the account balance.",
          [
            "Access modifiers",
            "Private data",
            "Getters",
            "Setters",
            "Data protection"
          ]
        )
      ],

      right: [
        topic(
          "inheritance",
          "Inheritance",
          "OOP",
          "Learn how one class can reuse or extend the behaviour of another class.",
          "Inheritance can reduce duplication when classes share common behaviour.",
          "A Manager class can inherit common properties from an Employee class.",
          [
            "Parent class",
            "Child class",
            "Method overriding",
            "super",
            "Hierarchies"
          ]
        ),

        topic(
          "polymorphism",
          "Polymorphism",
          "OOP",
          "Learn how the same interface or method can represent different implementations.",
          "Polymorphism makes software more flexible and extensible.",
          "Different payment classes can implement the same pay() operation differently.",
          [
            "Method overriding",
            "Method overloading",
            "Interfaces",
            "Dynamic behaviour"
          ]
        )
      ]
    },

    // =========================================================
    // 3. DATA STRUCTURES
    // =========================================================
    {
      id: "data-structures",
      title: "Data Structures",
      category: "CORE",

      main: topic(
        "data-structures",
        "Data Structures",
        "CORE",
        "Learn how data can be organized and stored efficiently for different operations.",
        "Choosing the right data structure directly affects application performance.",
        "A social network can use graphs to represent relationships between users.",
        [
          "Arrays",
          "Linked Lists",
          "Stacks",
          "Queues",
          "Trees",
          "Graphs",
          "Hash Tables"
        ]
      ),

      left: [
        topic(
          "linear-data-structures",
          "Linear Data Structures",
          "DATA STRUCTURES",
          "Learn data structures where elements are organized sequentially.",
          "These structures are fundamental for solving programming problems.",
          "A queue can be used to process customers in the order they arrive.",
          [
            "Arrays",
            "Linked Lists",
            "Stacks",
            "Queues",
            "Deque"
          ]
        ),

        topic(
          "hash-tables",
          "Hash Tables",
          "DATA STRUCTURES",
          "Learn how key-value data can be stored for fast lookup.",
          "Hash tables are widely used in real-world software and databases.",
          "A user ID can be mapped directly to a user's profile.",
          [
            "Hashing",
            "Keys",
            "Values",
            "Collision handling",
            "Hash functions"
          ]
        )
      ],

      right: [
        topic(
          "trees",
          "Trees",
          "DATA STRUCTURES",
          "Learn hierarchical data structures consisting of nodes and relationships.",
          "Trees are used in file systems, databases and many algorithms.",
          "A file system can be represented as a tree of folders and files.",
          [
            "Binary trees",
            "Binary search trees",
            "Traversal",
            "Heaps",
            "AVL trees"
          ]
        ),

        topic(
          "graphs",
          "Graphs",
          "DATA STRUCTURES",
          "Learn structures used to represent relationships between entities.",
          "Graphs are useful for networks, maps and dependency systems.",
          "A navigation application can represent locations as graph nodes connected by roads.",
          [
            "Vertices",
            "Edges",
            "BFS",
            "DFS",
            "Weighted graphs"
          ]
        )
      ]
    },

    // =========================================================
    // 4. ALGORITHMS
    // =========================================================
    {
      id: "algorithms",
      title: "Algorithms & Problem Solving",
      category: "CORE",

      main: topic(
        "algorithms",
        "Algorithms",
        "CORE",
        "Learn systematic approaches for solving computational problems efficiently.",
        "Algorithmic thinking improves coding ability and helps developers build efficient software.",
        "A search algorithm can quickly find a student record from thousands of records.",
        [
          "Searching",
          "Sorting",
          "Recursion",
          "Greedy Algorithms",
          "Dynamic Programming",
          "Graph Algorithms"
        ]
      ),

      left: [
        topic(
          "searching",
          "Searching Algorithms",
          "ALGORITHMS",
          "Learn techniques for finding elements in collections.",
          "Efficient searching is important when applications work with large datasets.",
          "Binary search can find an element quickly in a sorted array.",
          [
            "Linear Search",
            "Binary Search",
            "Search complexity",
            "Sorted data"
          ]
        ),

        topic(
          "sorting",
          "Sorting Algorithms",
          "ALGORITHMS",
          "Learn algorithms that arrange data according to a specified order.",
          "Sorting is a common operation used in applications and other algorithms.",
          "A college application can sort students according to CGPA.",
          [
            "Bubble Sort",
            "Selection Sort",
            "Insertion Sort",
            "Merge Sort",
            "Quick Sort"
          ]
        )
      ],

      right: [
        topic(
          "recursion",
          "Recursion",
          "ALGORITHMS",
          "Learn how a function can solve a problem by calling itself on smaller instances.",
          "Recursion is fundamental to many tree and divide-and-conquer algorithms.",
          "Tree traversal can be implemented using recursive functions.",
          [
            "Base case",
            "Recursive case",
            "Call stack",
            "Divide and conquer"
          ]
        ),

        topic(
          "dynamic-programming",
          "Dynamic Programming",
          "ALGORITHMS",
          "Learn how to solve problems by breaking them into overlapping subproblems and storing previous results.",
          "Dynamic programming can significantly reduce repeated computation.",
          "A scheduling problem can store solutions to smaller subproblems instead of recalculating them.",
          [
            "Memoization",
            "Tabulation",
            "Overlapping subproblems",
            "Optimal substructure"
          ]
        )
      ]
    },

    // =========================================================
    // 5. SOFTWARE ENGINEERING
    // =========================================================
    {
      id: "software-engineering",
      title: "Software Engineering",
      category: "ENGINEERING",

      main: topic(
        "software-engineering",
        "Software Engineering",
        "ENGINEERING",
        "Learn the principles used to plan, design, develop, test and maintain software systems.",
        "Software engineering helps developers build maintainable and reliable systems instead of only writing code.",
        "A team can use requirements, design documents, testing and code reviews to develop a banking application.",
        [
          "Requirements",
          "Design",
          "Development",
          "Testing",
          "Maintenance",
          "Documentation"
        ]
      ),

      left: [
        topic(
          "requirements",
          "Requirements Engineering",
          "SOFTWARE ENGINEERING",
          "Learn how to identify, document and manage what a software system needs to accomplish.",
          "Clear requirements reduce misunderstandings between users and developers.",
          "A student platform may require login, profile management and progress tracking.",
          [
            "Functional requirements",
            "Non-functional requirements",
            "User stories",
            "Use cases",
            "Acceptance criteria"
          ]
        ),

        topic(
          "software-design",
          "Software Design",
          "SOFTWARE ENGINEERING",
          "Learn how to design software structure before implementation.",
          "Good design makes applications easier to understand, test and extend.",
          "A system can separate authentication, business logic and database access into different modules.",
          [
            "Architecture",
            "Modules",
            "Interfaces",
            "Separation of concerns",
            "Design decisions"
          ]
        )
      ],

      right: [
        topic(
          "solid",
          "SOLID Principles",
          "SOFTWARE ENGINEERING",
          "Learn principles that help developers create maintainable object-oriented software.",
          "SOLID principles encourage flexible and understandable code.",
          "A large application can separate responsibilities instead of placing all logic inside one class.",
          [
            "Single Responsibility",
            "Open/Closed",
            "Liskov Substitution",
            "Interface Segregation",
            "Dependency Inversion"
          ]
        ),

        topic(
          "design-patterns",
          "Design Patterns",
          "SOFTWARE ENGINEERING",
          "Learn reusable approaches for common software design problems.",
          "Patterns provide established ways to structure recurring software problems.",
          "A Factory pattern can create different types of notification services.",
          [
            "Factory",
            "Singleton",
            "Observer",
            "Strategy",
            "Adapter"
          ]
        )
      ]
    },

    // =========================================================
    // 6. DATABASES
    // =========================================================
    {
      id: "software-databases",
      title: "Databases",
      category: "BACKEND",

      main: topic(
        "software-databases",
        "Database Development",
        "BACKEND",
        "Learn how software applications store, retrieve and manage persistent data.",
        "Almost every real-world software system needs a reliable data layer.",
        "An e-commerce application stores users, products, orders and payments in a database.",
        [
          "SQL",
          "NoSQL",
          "CRUD",
          "Relationships",
          "Indexes",
          "Transactions"
        ]
      ),

      left: [
        topic(
          "sql-databases",
          "SQL Databases",
          "DATABASE",
          "Learn relational databases and structured query language.",
          "Relational databases are widely used for applications with structured relationships.",
          "A college system can store students and courses in related tables.",
          [
            "Tables",
            "SELECT",
            "INSERT",
            "UPDATE",
            "DELETE",
            "JOIN"
          ]
        ),

        topic(
          "database-normalization",
          "Database Normalization",
          "DATABASE",
          "Learn how to organize relational data to reduce unnecessary duplication.",
          "Proper database design improves consistency and maintainability.",
          "Student information can be separated from course enrollment data instead of duplicating it.",
          [
            "Normalization",
            "1NF",
            "2NF",
            "3NF",
            "Functional dependencies"
          ]
        )
      ],

      right: [
        topic(
          "nosql",
          "NoSQL Databases",
          "DATABASE",
          "Learn databases that use models such as documents, key-value pairs or graphs.",
          "NoSQL databases can be useful for flexible or large-scale data models.",
          "A MongoDB collection can store user profiles as documents.",
          [
            "MongoDB",
            "Documents",
            "Collections",
            "Key-value stores",
            "Document modeling"
          ]
        ),

        topic(
          "database-indexing",
          "Database Indexing",
          "DATABASE",
          "Learn how indexes improve the speed of database queries.",
          "Indexes become important when applications handle large amounts of data.",
          "An index on email can make finding a user much faster.",
          [
            "Indexes",
            "Query performance",
            "Primary keys",
            "Composite indexes"
          ]
        )
      ]
    },

    // =========================================================
    // 7. BACKEND DEVELOPMENT
    // =========================================================
    {
      id: "backend-development",
      title: "Backend Development",
      category: "BACKEND",

      main: topic(
        "backend-development",
        "Backend Development",
        "BACKEND",
        "Learn how servers handle requests, execute business logic and communicate with databases.",
        "Backend development powers the functionality behind modern applications.",
        "A backend can process a login request, validate credentials and return user information.",
        [
          "Servers",
          "APIs",
          "Business Logic",
          "Authentication",
          "Databases",
          "Middleware"
        ]
      ),

      left: [
        topic(
          "server-development",
          "Server Development",
          "BACKEND",
          "Learn how to create applications that run on servers and process client requests.",
          "Servers provide the functionality required by frontend applications.",
          "A Node.js server can receive requests from a React application.",
          [
            "Node.js",
            "Express",
            "Routes",
            "Requests",
            "Responses"
          ]
        ),

        topic(
          "rest-api-development",
          "REST API Development",
          "BACKEND",
          "Learn how to design APIs that allow different software components to communicate.",
          "APIs are one of the main ways frontend and backend systems interact.",
          "A GET /students endpoint can return a list of students.",
          [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "HTTP status codes"
          ]
        )
      ],

      right: [
        topic(
          "middleware",
          "Middleware",
          "BACKEND",
          "Learn how middleware processes requests before they reach the final route handler.",
          "Middleware is commonly used for authentication, logging and validation.",
          "Authentication middleware can verify a user's token before allowing access to a route.",
          [
            "Request pipeline",
            "Authentication",
            "Logging",
            "Validation",
            "Error handling"
          ]
        ),

        topic(
          "backend-architecture",
          "Backend Architecture",
          "BACKEND",
          "Learn how to organize backend applications into maintainable layers.",
          "Layered architecture makes large backend systems easier to maintain.",
          "A backend can separate controllers, services, repositories and database logic.",
          [
            "Controllers",
            "Services",
            "Repositories",
            "Routes",
            "Separation of concerns"
          ]
        )
      ]
    },

    // =========================================================
    // 8. AUTHENTICATION & SECURITY
    // =========================================================
    {
      id: "security",
      title: "Security",
      category: "SECURITY",

      main: topic(
        "security",
        "Application Security",
        "SECURITY",
        "Learn how to protect applications, accounts, APIs and data from common security threats.",
        "Security is essential when software handles user information or sensitive operations.",
        "A banking application must authenticate users and protect financial information.",
        [
          "Authentication",
          "Authorization",
          "Encryption",
          "Input Validation",
          "Secure APIs"
        ]
      ),

      left: [
        topic(
          "authentication",
          "Authentication",
          "SECURITY",
          "Learn how applications verify the identity of users.",
          "Authentication protects private user accounts and resources.",
          "A login system verifies a user's credentials before creating a session.",
          [
            "Login",
            "Signup",
            "Passwords",
            "Sessions",
            "JWT"
          ]
        ),

        topic(
          "authorization",
          "Authorization",
          "SECURITY",
          "Learn how applications determine what an authenticated user is allowed to access.",
          "Different users often have different permissions.",
          "An admin can manage users while a normal student can only view their own profile.",
          [
            "Roles",
            "Permissions",
            "RBAC",
            "Access control",
            "Protected routes"
          ]
        )
      ],

      right: [
        topic(
          "encryption",
          "Encryption",
          "SECURITY",
          "Learn how data can be protected by transforming it into an unreadable form without the required key.",
          "Encryption protects sensitive information during storage and transmission.",
          "HTTPS encrypts communication between a browser and a web server.",
          [
            "Encryption",
            "Decryption",
            "Symmetric encryption",
            "Asymmetric encryption",
            "HTTPS"
          ]
        ),

        topic(
          "secure-coding",
          "Secure Coding",
          "SECURITY",
          "Learn programming practices that reduce common application vulnerabilities.",
          "Security problems can originate from ordinary coding decisions.",
          "Validating user input helps reduce the risk of malicious data reaching application logic.",
          [
            "Input validation",
            "SQL injection",
            "XSS",
            "CSRF",
            "Secure configuration"
          ]
        )
      ]
    },

    // =========================================================
    // 9. TESTING
    // =========================================================
    {
      id: "software-testing",
      title: "Software Testing",
      category: "QUALITY",

      main: topic(
        "software-testing",
        "Software Testing",
        "QUALITY",
        "Learn how to verify that software behaves correctly and continues to work after changes.",
        "Testing reduces bugs and gives developers confidence when modifying applications.",
        "A banking application can automatically test login, transfers and account operations.",
        [
          "Unit Testing",
          "Integration Testing",
          "System Testing",
          "End-to-End Testing",
          "Test Automation"
        ]
      ),

      left: [
        topic(
          "unit-testing",
          "Unit Testing",
          "TESTING",
          "Test individual functions, methods or components independently.",
          "Unit tests help identify bugs early and make code changes safer.",
          "A test can verify that a calculateSalary() function returns the correct result.",
          [
            "Test cases",
            "Assertions",
            "Mocks",
            "Test coverage",
            "Test suites"
          ]
        ),

        topic(
          "integration-testing",
          "Integration Testing",
          "TESTING",
          "Test how multiple components or services work together.",
          "Individual components may work correctly while their integration fails.",
          "Testing whether an API correctly stores submitted data in a database.",
          [
            "API testing",
            "Database testing",
            "Service integration",
            "Test environments"
          ]
        )
      ],

      right: [
        topic(
          "system-testing",
          "System Testing",
          "TESTING",
          "Test the complete software system against its requirements.",
          "It verifies that the complete application behaves as expected.",
          "Testing an entire placement platform from login through prediction generation.",
          [
            "Functional testing",
            "Requirements",
            "System behaviour",
            "Test scenarios"
          ]
        ),

        topic(
          "test-automation",
          "Test Automation",
          "TESTING",
          "Learn how software tests can be executed automatically.",
          "Automation saves time and helps maintain quality as applications grow.",
          "Every code push can automatically run the application's test suite.",
          [
            "Automated tests",
            "CI testing",
            "Test suites",
            "Regression testing"
          ]
        )
      ]
    },

    // =========================================================
    // 10. GIT & COLLABORATION
    // =========================================================
    {
      id: "version-control",
      title: "Version Control & Collaboration",
      category: "TOOLS",

      main: topic(
        "version-control",
        "Git & Version Control",
        "TOOLS",
        "Learn how developers track code changes and collaborate safely on software projects.",
        "Version control is essential for individual development and team-based software engineering.",
        "A team can create separate branches for features and merge completed work into the main branch.",
        [
          "Git",
          "GitHub",
          "Branches",
          "Commits",
          "Pull Requests",
          "Code Review"
        ]
      ),

      left: [
        topic(
          "git-basics",
          "Git Basics",
          "GIT",
          "Learn how to create commits and track changes in a software project.",
          "Git allows developers to maintain a history of their code.",
          "Commit changes after implementing a new feature.",
          [
            "git init",
            "git add",
            "git commit",
            "git status",
            "git log"
          ]
        ),

        topic(
          "branching",
          "Branching & Merging",
          "GIT",
          "Learn how to work on multiple features independently.",
          "Branches allow teams to develop features without directly modifying the main code.",
          "A developer can create a feature/login branch for authentication work.",
          [
            "Branches",
            "Merge",
            "Rebase",
            "Merge conflicts",
            "Feature branches"
          ]
        )
      ],

      right: [
        topic(
          "github-collaboration",
          "GitHub Collaboration",
          "COLLABORATION",
          "Learn how teams use GitHub to manage repositories and collaborate on software.",
          "GitHub provides tools for code review and project collaboration.",
          "A developer submits a pull request for teammates to review.",
          [
            "Repositories",
            "Pull Requests",
            "Issues",
            "Code Review",
            "README"
          ]
        ),

        topic(
          "code-review",
          "Code Review",
          "COLLABORATION",
          "Learn how developers review code before merging it into the main codebase.",
          "Code review helps identify bugs and maintain coding standards.",
          "A teammate reviews a new authentication feature before it is merged.",
          [
            "Pull requests",
            "Review comments",
            "Approval",
            "Merge"
          ]
        )
      ]
    },

    // =========================================================
    // 11. SYSTEM DESIGN
    // =========================================================
    {
      id: "system-design",
      title: "System Design",
      category: "ADVANCED",

      main: topic(
        "system-design",
        "System Design",
        "ADVANCED",
        "Learn how to design software systems that can handle users, data, traffic and changing requirements.",
        "System design becomes important when applications grow beyond small projects.",
        "A social media application needs architecture capable of serving millions of users.",
        [
          "Architecture",
          "Scalability",
          "Caching",
          "Load Balancing",
          "Databases",
          "Distributed Systems"
        ]
      ),

      left: [
        topic(
          "scalability",
          "Scalability",
          "SYSTEM DESIGN",
          "Learn how systems can handle increasing numbers of users and requests.",
          "Applications need to remain usable as demand grows.",
          "An e-commerce website may need to handle a large increase in traffic during a sale.",
          [
            "Vertical scaling",
            "Horizontal scaling",
            "Stateless services",
            "Distributed systems"
          ]
        ),

        topic(
          "caching",
          "Caching",
          "SYSTEM DESIGN",
          "Learn how frequently accessed data can be temporarily stored for faster retrieval.",
          "Caching can reduce database load and improve response times.",
          "A frequently requested product list can be cached instead of querying the database every time.",
          [
            "Cache",
            "Redis",
            "Cache invalidation",
            "TTL",
            "Caching strategies"
          ]
        )
      ],

      right: [
        topic(
          "load-balancing",
          "Load Balancing",
          "SYSTEM DESIGN",
          "Learn how incoming requests can be distributed across multiple servers.",
          "Load balancing improves scalability and availability.",
          "An application can distribute requests across several backend servers.",
          [
            "Load balancer",
            "Traffic distribution",
            "Health checks",
            "Horizontal scaling"
          ]
        ),

        topic(
          "distributed-systems",
          "Distributed Systems",
          "SYSTEM DESIGN",
          "Learn how multiple computers or services cooperate to provide one application.",
          "Large-scale applications often consist of multiple services working together.",
          "A food delivery platform may have separate services for users, orders and payments.",
          [
            "Services",
            "Communication",
            "Fault tolerance",
            "Consistency",
            "Availability"
          ]
        )
      ]
    },

    // =========================================================
    // 12. DEVOPS & DEPLOYMENT
    // =========================================================
    {
      id: "devops",
      title: "DevOps & Deployment",
      category: "PRODUCTION",

      main: topic(
        "devops",
        "DevOps & Deployment",
        "PRODUCTION",
        "Learn how software is built, deployed, monitored and maintained in production environments.",
        "Professional software development includes reliable deployment and operations.",
        "A web application can automatically build, test and deploy whenever new code is merged.",
        [
          "Docker",
          "CI/CD",
          "Cloud",
          "Deployment",
          "Monitoring",
          "Logging"
        ]
      ),

      left: [
        topic(
          "docker",
          "Docker",
          "DEVOPS",
          "Learn how to package applications and dependencies into portable containers.",
          "Containers provide consistent environments across development and production.",
          "A backend API can run inside a Docker container with all required dependencies.",
          [
            "Images",
            "Containers",
            "Dockerfile",
            "Volumes",
            "Networking"
          ]
        ),

        topic(
          "ci-cd",
          "CI/CD",
          "DEVOPS",
          "Learn how automated pipelines can build, test and deploy software.",
          "Automation reduces manual deployment work and catches problems earlier.",
          "A GitHub push can automatically run tests before deployment.",
          [
            "Continuous Integration",
            "Continuous Deployment",
            "Pipelines",
            "Automated testing"
          ]
        )
      ],

      right: [
        topic(
          "cloud-deployment",
          "Cloud Deployment",
          "CLOUD",
          "Learn how applications can be deployed to cloud infrastructure.",
          "Cloud platforms allow applications to be accessed by users over the internet.",
          "A full-stack application can deploy its frontend, backend and database using cloud services.",
          [
            "Cloud servers",
            "Hosting",
            "Storage",
            "Networking",
            "Environment variables"
          ]
        ),

        topic(
          "monitoring-logging",
          "Monitoring & Logging",
          "DEVOPS",
          "Learn how to observe application health and diagnose production problems.",
          "Production systems need monitoring to detect failures and performance issues.",
          "Logs can help developers identify why an API started returning errors.",
          [
            "Logs",
            "Metrics",
            "Errors",
            "Performance",
            "Alerts"
          ]
        )
      ]
    },

    // =========================================================
    // 13. REAL-WORLD PROJECTS
    // =========================================================
    {
      id: "software-projects",
      title: "Build Real Software",
      category: "BUILD",

      main: topic(
        "software-projects",
        "Real-World Software Projects",
        "BUILD",
        "Apply software engineering concepts by building complete applications from planning to deployment.",
        "Projects demonstrate practical engineering ability and help connect theory with real development.",
        "Build a complete student management or career platform with authentication, database and APIs.",
        [
          "Planning",
          "Architecture",
          "Development",
          "Testing",
          "Deployment",
          "Documentation"
        ]
      ),

      left: [
        topic(
          "management-system",
          "Management System",
          "PROJECT",
          "Build a complete CRUD-based application for managing structured information.",
          "CRUD applications teach frontend, backend and database integration.",
          "Build a student management system with students, courses and attendance.",
          [
            "Authentication",
            "CRUD",
            "Database",
            "Search",
            "Filtering",
            "Dashboard"
          ]
        ),

        topic(
          "chat-application",
          "Real-Time Chat Application",
          "PROJECT",
          "Build an application where users can communicate in real time.",
          "Real-time systems introduce concepts beyond normal request-response applications.",
          "Users can send and receive messages instantly using WebSockets.",
          [
            "WebSockets",
            "Authentication",
            "Messages",
            "Online status",
            "Notifications"
          ]
        )
      ],

      right: [
        topic(
          "ecommerce-system",
          "E-Commerce System",
          "PROJECT",
          "Build a complete online shopping platform with products, users, carts and orders.",
          "E-commerce projects combine many real-world software engineering concepts.",
          "Users can browse products, add items to a cart and place orders.",
          [
            "Products",
            "Authentication",
            "Cart",
            "Orders",
            "Payments",
            "Database"
          ]
        ),

        topic(
          "capstone-project",
          "Software Engineering Capstone",
          "PROJECT",
          "Build one complete production-style application combining the concepts learned throughout the roadmap.",
          "A capstone demonstrates your ability to design, implement, test and deploy a complete software system.",
          "Build EngineerOS as a complete student career and engineering guidance platform.",
          [
            "Requirements",
            "Architecture",
            "Frontend",
            "Backend",
            "Database",
            "Testing",
            "Deployment"
          ]
        )
      ]
    }
  ]
},

  "data-science": {
  id: "data-science",
  title: "Data Science Roadmap",
  description:
    "A structured path from statistics and Python to data analysis, machine learning, visualization and real-world data science projects.",

  sections: [
    // =========================================================
    // 1. DATA SCIENCE FOUNDATIONS
    // =========================================================
    {
      id: "data-science-foundations",
      title: "Data Science Foundations",
      category: "START",

      main: topic(
        "data-science-foundations",
        "Data Science Foundations",
        "START",
        "Learn how data science combines programming, statistics, mathematics and domain knowledge to extract useful insights from data.",
        "Understanding the complete data science workflow helps you approach problems systematically.",
        "A company can analyse customer data to understand behaviour and improve its products.",
        [
          "What is Data Science?",
          "Data Science Workflow",
          "Data Types",
          "Structured Data",
          "Unstructured Data",
          "Business Problems"
        ]
      ),

      left: [
        topic(
          "data-science-workflow",
          "Data Science Workflow",
          "FOUNDATION",
          "Learn the typical stages involved in solving a data science problem.",
          "A structured workflow prevents important steps from being skipped.",
          "A customer churn project can move from problem definition to data collection, analysis, modelling and deployment.",
          [
            "Problem Definition",
            "Data Collection",
            "Data Cleaning",
            "EDA",
            "Modeling",
            "Evaluation"
          ]
        ),

        topic(
          "data-types",
          "Types of Data",
          "FOUNDATION",
          "Learn how data can be categorized according to its structure and characteristics.",
          "Understanding data types helps determine how data should be processed and analysed.",
          "Age is numerical data while customer category is categorical data.",
          [
            "Numerical",
            "Categorical",
            "Ordinal",
            "Continuous",
            "Discrete",
            "Text"
          ]
        )
      ],

      right: [
        topic(
          "structured-data",
          "Structured Data",
          "FOUNDATION",
          "Learn about data organized into clearly defined rows and columns.",
          "Structured data is commonly used in analytics and machine learning.",
          "A student database containing name, CGPA and branch is structured data.",
          [
            "Tables",
            "Rows",
            "Columns",
            "Schemas",
            "Relational data"
          ]
        ),

        topic(
          "business-problems",
          "Business Problem Understanding",
          "FOUNDATION",
          "Learn how to translate a real-world business question into a data problem.",
          "A technically correct model is not useful if it does not solve the actual problem.",
          "A company may want to predict which customers are likely to leave.",
          [
            "Problem definition",
            "Objectives",
            "KPIs",
            "Constraints",
            "Success criteria"
          ]
        )
      ]
    },

    // =========================================================
    // 2. PYTHON
    // =========================================================
    {
      id: "python-data-science",
      title: "Python for Data Science",
      category: "PROGRAMMING",

      main: topic(
        "python-data-science",
        "Python for Data Science",
        "PROGRAMMING",
        "Learn Python programming and the libraries commonly used for data analysis and machine learning.",
        "Python provides a large ecosystem for data manipulation, visualization and modelling.",
        "A data scientist can use Python to load a dataset, clean it and build visualizations.",
        [
          "Python Basics",
          "Functions",
          "OOP",
          "NumPy",
          "Pandas",
          "Matplotlib"
        ]
      ),

      left: [
        topic(
          "python-ds-basics",
          "Python Fundamentals",
          "PYTHON",
          "Learn variables, conditions, loops, functions and data structures in Python.",
          "Programming fundamentals are required for writing data-processing pipelines.",
          "A Python program can calculate statistics from a list of student marks.",
          [
            "Variables",
            "Data Types",
            "Conditions",
            "Loops",
            "Functions",
            "Lists",
            "Dictionaries"
          ]
        ),

        topic(
          "numpy-ds",
          "NumPy",
          "PYTHON ECOSYSTEM",
          "Learn numerical arrays and mathematical operations using NumPy.",
          "Data science frequently involves numerical computation and array operations.",
          "A dataset can be represented as a NumPy array for numerical processing.",
          [
            "Arrays",
            "Indexing",
            "Vectorization",
            "Matrix Operations",
            "Broadcasting"
          ]
        )
      ],

      right: [
        topic(
          "pandas-ds",
          "Pandas",
          "PYTHON ECOSYSTEM",
          "Learn how to load, manipulate, clean and analyse tabular data using Pandas.",
          "Pandas is one of the most important tools for practical data analysis.",
          "A CSV containing student placement data can be loaded into a DataFrame.",
          [
            "DataFrame",
            "Series",
            "CSV",
            "Filtering",
            "Grouping",
            "Missing Values"
          ]
        ),

        topic(
          "python-data-structures",
          "Python Data Structures",
          "PYTHON",
          "Learn lists, tuples, sets and dictionaries for organizing data in Python.",
          "Data structures are frequently used while transforming and processing datasets.",
          "A dictionary can store information about a particular customer.",
          [
            "Lists",
            "Tuples",
            "Sets",
            "Dictionaries",
            "Comprehensions"
          ]
        )
      ]
    },

    // =========================================================
    // 3. STATISTICS
    // =========================================================
    {
      id: "statistics",
      title: "Statistics",
      category: "FOUNDATION",

      main: topic(
        "statistics",
        "Statistics",
        "FOUNDATION",
        "Learn statistical concepts used to understand datasets, distributions and relationships between variables.",
        "Statistics provides the mathematical foundation for analysing uncertainty and variation in data.",
        "A company can calculate average customer spending and measure how much individual spending varies.",
        [
          "Descriptive Statistics",
          "Probability",
          "Distributions",
          "Correlation",
          "Hypothesis Testing",
          "Sampling"
        ]
      ),

      left: [
        topic(
          "descriptive-statistics",
          "Descriptive Statistics",
          "STATISTICS",
          "Learn methods for summarizing and describing datasets.",
          "Descriptive statistics provide a quick understanding of the data.",
          "Mean and median can summarize the distribution of student CGPA values.",
          [
            "Mean",
            "Median",
            "Mode",
            "Variance",
            "Standard Deviation",
            "Percentiles"
          ]
        ),

        topic(
          "probability-ds",
          "Probability",
          "STATISTICS",
          "Learn how probability represents uncertainty and possible outcomes.",
          "Many data science models involve uncertainty and probabilistic reasoning.",
          "A model may estimate the probability that a customer will purchase a product.",
          [
            "Probability",
            "Conditional Probability",
            "Bayes Theorem",
            "Random Variables",
            "Distributions"
          ]
        )
      ],

      right: [
        topic(
          "distributions",
          "Probability Distributions",
          "STATISTICS",
          "Learn how data and random variables can be represented using probability distributions.",
          "Distributions help understand how values are spread across a dataset.",
          "A histogram can approximate the distribution of exam scores.",
          [
            "Normal Distribution",
            "Binomial Distribution",
            "Uniform Distribution",
            "Probability Density"
          ]
        ),

        topic(
          "hypothesis-testing",
          "Hypothesis Testing",
          "STATISTICS",
          "Learn how statistical tests can be used to evaluate claims about data.",
          "Hypothesis testing helps determine whether observed differences may be statistically meaningful.",
          "A company can test whether a new recommendation system changes average user engagement.",
          [
            "Null Hypothesis",
            "Alternative Hypothesis",
            "p-value",
            "Significance",
            "Confidence Interval"
          ]
        )
      ]
    },

    // =========================================================
    // 4. DATA COLLECTION
    // =========================================================
    {
      id: "data-collection",
      title: "Data Collection",
      category: "DATA",

      main: topic(
        "data-collection-ds",
        "Data Collection",
        "DATA",
        "Learn how data is obtained from databases, files, APIs and other sources.",
        "The quality and relevance of collected data strongly affect the final analysis.",
        "A company can collect sales information from its database for analysis.",
        [
          "CSV",
          "Excel",
          "Databases",
          "APIs",
          "JSON",
          "Web Data"
        ]
      ),

      left: [
        topic(
          "csv-excel",
          "CSV & Excel Data",
          "DATA",
          "Learn how to work with common tabular file formats.",
          "Many organizations store analytical data in CSV or spreadsheet files.",
          "A sales team can export monthly sales records into a CSV file.",
          [
            "CSV",
            "Excel",
            "Import",
            "Export",
            "DataFrames"
          ]
        ),

        topic(
          "api-data",
          "APIs for Data Collection",
          "DATA",
          "Learn how to obtain data from external services through APIs.",
          "APIs provide structured access to constantly changing data.",
          "A weather application can collect current weather information from an API.",
          [
            "HTTP",
            "GET Requests",
            "JSON",
            "API Authentication",
            "Response Handling"
          ]
        )
      ],

      right: [
        topic(
          "database-data",
          "Database Data",
          "DATA",
          "Learn how to retrieve analytical data from databases.",
          "Real-world organizations commonly store large amounts of data in databases.",
          "A company can query customer transactions from a SQL database.",
          [
            "SQL",
            "SELECT",
            "JOIN",
            "Filtering",
            "Aggregation"
          ]
        ),

        topic(
          "web-scraping",
          "Web Data Collection",
          "DATA",
          "Learn how publicly available web information can be collected programmatically where permitted.",
          "Web data can provide additional information for certain analytical problems.",
          "A research project can collect publicly available product information for analysis.",
          [
            "HTML",
            "Requests",
            "Parsing",
            "BeautifulSoup",
            "Data Cleaning"
          ]
        )
      ]
    },

    // =========================================================
    // 5. DATA CLEANING
    // =========================================================
    {
      id: "data-cleaning",
      title: "Data Cleaning & Preparation",
      category: "PREPROCESSING",

      main: topic(
        "data-cleaning",
        "Data Cleaning",
        "PREPROCESSING",
        "Learn how to identify and correct missing, duplicate, inconsistent and invalid data.",
        "Real-world datasets are rarely clean and usually require preparation before analysis.",
        "A customer dataset may contain missing ages, duplicate records and inconsistent city names.",
        [
          "Missing Values",
          "Duplicates",
          "Outliers",
          "Data Types",
          "Consistency",
          "Validation"
        ]
      ),

      left: [
        topic(
          "missing-values",
          "Missing Values",
          "PREPROCESSING",
          "Learn how to identify and handle missing information in datasets.",
          "Missing data can affect statistical analysis and machine learning models.",
          "Missing salary values can be replaced using an appropriate strategy or excluded when justified.",
          [
            "Detection",
            "Deletion",
            "Mean Imputation",
            "Median Imputation",
            "Forward Fill"
          ]
        ),

        topic(
          "duplicates",
          "Duplicate Data",
          "PREPROCESSING",
          "Learn how to identify and remove duplicate records.",
          "Duplicate records can distort analysis and produce misleading results.",
          "The same customer appearing twice in a dataset can incorrectly increase customer counts.",
          [
            "Duplicate detection",
            "Duplicate removal",
            "Unique records",
            "Data validation"
          ]
        )
      ],

      right: [
        topic(
          "outliers",
          "Outlier Detection",
          "PREPROCESSING",
          "Learn how to identify observations that differ significantly from the rest of the data.",
          "Outliers can represent errors or legitimate unusual cases and should be investigated.",
          "A transaction worth ₹10 lakh may be an unusual but legitimate purchase or a data error.",
          [
            "IQR",
            "Z-score",
            "Box Plot",
            "Outlier analysis"
          ]
        ),

        topic(
          "data-transformation",
          "Data Transformation",
          "PREPROCESSING",
          "Learn how to convert data into forms suitable for analysis and modelling.",
          "Many algorithms require numerical or standardized inputs.",
          "Categorical values such as Male and Female can be encoded numerically.",
          [
            "Encoding",
            "Scaling",
            "Normalization",
            "Transformation",
            "Feature conversion"
          ]
        )
      ]
    },

    // =========================================================
    // 6. EXPLORATORY DATA ANALYSIS
    // =========================================================
    {
      id: "eda",
      title: "Exploratory Data Analysis",
      category: "ANALYSIS",

      main: topic(
        "eda",
        "Exploratory Data Analysis",
        "ANALYSIS",
        "Learn how to explore datasets using statistics and visualizations to discover patterns and relationships.",
        "EDA helps you understand what the data contains before building models.",
        "A placement dataset can be analysed to see whether CGPA and internships are associated with placement outcomes.",
        [
          "Data Profiling",
          "Distributions",
          "Relationships",
          "Outliers",
          "Correlation",
          "Visualization"
        ]
      ),

      left: [
        topic(
          "univariate-analysis",
          "Univariate Analysis",
          "EDA",
          "Learn how to analyse one variable at a time.",
          "It helps understand the distribution and characteristics of individual variables.",
          "Analysing the distribution of student CGPA values.",
          [
            "Frequency",
            "Mean",
            "Median",
            "Histogram",
            "Box Plot"
          ]
        ),

        topic(
          "bivariate-analysis",
          "Bivariate Analysis",
          "EDA",
          "Learn how to analyse relationships between two variables.",
          "Relationships between variables can reveal useful patterns.",
          "A scatter plot can show the relationship between experience and salary.",
          [
            "Scatter Plot",
            "Correlation",
            "Grouped Analysis",
            "Comparison"
          ]
        )
      ],

      right: [
        topic(
          "multivariate-analysis",
          "Multivariate Analysis",
          "EDA",
          "Learn how to examine relationships among multiple variables.",
          "Real-world outcomes are often influenced by multiple factors simultaneously.",
          "Salary can be analysed using experience, education, location and skills together.",
          [
            "Multiple variables",
            "Correlation Matrix",
            "Heatmaps",
            "Feature Relationships"
          ]
        ),

        topic(
          "data-visualization",
          "Data Visualization",
          "VISUALIZATION",
          "Learn how to communicate patterns and insights through charts and graphs.",
          "Good visualizations make complex datasets easier to understand.",
          "A dashboard can display sales trends using line charts and category performance using bar charts.",
          [
            "Bar Charts",
            "Line Charts",
            "Scatter Plots",
            "Histograms",
            "Heatmaps"
          ]
        )
      ]
    },

    // =========================================================
    // 7. DATA VISUALIZATION
    // =========================================================
    {
      id: "visualization",
      title: "Data Visualization",
      category: "VISUALIZATION",

      main: topic(
        "visualization",
        "Data Visualization",
        "VISUALIZATION",
        "Learn how to communicate analytical findings using clear and meaningful visual representations.",
        "Visualization helps users understand trends, comparisons and relationships quickly.",
        "A business dashboard can show monthly revenue and customer growth using interactive charts.",
        [
          "Matplotlib",
          "Seaborn",
          "Plotly",
          "Charts",
          "Dashboards",
          "Storytelling"
        ]
      ),

      left: [
        topic(
          "matplotlib",
          "Matplotlib",
          "VISUALIZATION",
          "Learn how to create static charts and plots using Python.",
          "Matplotlib provides flexible control over analytical visualizations.",
          "A line chart can show how sales change over time.",
          [
            "Line Plot",
            "Bar Chart",
            "Histogram",
            "Scatter Plot",
            "Customization"
          ]
        ),

        topic(
          "seaborn",
          "Seaborn",
          "VISUALIZATION",
          "Learn how to create statistical visualizations using Python.",
          "Seaborn simplifies many common statistical plots.",
          "A heatmap can display correlations between numerical features.",
          [
            "Heatmaps",
            "Box Plots",
            "Violin Plots",
            "Pair Plots",
            "Statistical Charts"
          ]
        )
      ],

      right: [
        topic(
          "plotly",
          "Interactive Visualization",
          "VISUALIZATION",
          "Learn how to create interactive charts that allow users to explore data.",
          "Interactive visualizations are useful for dashboards and analytical applications.",
          "A user can hover over a chart to inspect the exact sales value for a month.",
          [
            "Interactive Charts",
            "Hover",
            "Zoom",
            "Filters",
            "Dashboards"
          ]
        ),

        topic(
          "data-storytelling",
          "Data Storytelling",
          "VISUALIZATION",
          "Learn how to communicate insights by combining data, visuals and a clear narrative.",
          "Analysis is more useful when decision-makers can understand the findings.",
          "A business report can explain why sales decreased and what action should be taken.",
          [
            "Insights",
            "Narrative",
            "Charts",
            "Business Context",
            "Recommendations"
          ]
        )
      ]
    },

    // =========================================================
    // 8. MACHINE LEARNING
    // =========================================================
    {
      id: "machine-learning-ds",
      title: "Machine Learning",
      category: "CORE",

      main: topic(
        "machine-learning-ds",
        "Machine Learning",
        "CORE",
        "Learn how statistical and computational algorithms can learn patterns from data and make predictions.",
        "Machine learning allows data science projects to move from descriptive analysis toward predictive systems.",
        "A company can train a model to predict whether a customer is likely to leave.",
        [
          "Supervised Learning",
          "Unsupervised Learning",
          "Classification",
          "Regression",
          "Clustering",
          "Model Evaluation"
        ]
      ),

      left: [
        topic(
          "supervised-learning-ds",
          "Supervised Learning",
          "MACHINE LEARNING",
          "Learn algorithms that train using examples with known target values.",
          "Supervised learning is useful for prediction problems.",
          "A placement dataset with PlacementStatus labels can be used to train a classifier.",
          [
            "Classification",
            "Regression",
            "Labels",
            "Training Data",
            "Validation"
          ]
        ),

        topic(
          "unsupervised-learning-ds",
          "Unsupervised Learning",
          "MACHINE LEARNING",
          "Learn algorithms that discover patterns without predefined target labels.",
          "It can reveal hidden groups and structures in data.",
          "Customers can be grouped based on purchasing behaviour.",
          [
            "Clustering",
            "K-Means",
            "Hierarchical Clustering",
            "Dimensionality Reduction"
          ]
        )
      ],

      right: [
        topic(
          "classification",
          "Classification",
          "MACHINE LEARNING",
          "Learn how models predict discrete categories or classes.",
          "Classification is useful when the desired outcome belongs to a fixed set of categories.",
          "A model can classify students as placed or not placed.",
          [
            "Binary Classification",
            "Multiclass Classification",
            "Logistic Regression",
            "Decision Trees",
            "Random Forest"
          ]
        ),

        topic(
          "regression",
          "Regression",
          "MACHINE LEARNING",
          "Learn how models predict continuous numerical values.",
          "Regression is useful for predicting quantities rather than categories.",
          "A model can predict the expected salary of a candidate.",
          [
            "Linear Regression",
            "Multiple Regression",
            "Prediction",
            "Error",
            "R-squared"
          ]
        )
      ]
    },

    // =========================================================
    // 9. MODEL EVALUATION
    // =========================================================
    {
      id: "model-evaluation-ds",
      title: "Model Evaluation",
      category: "EVALUATION",

      main: topic(
        "model-evaluation-ds",
        "Model Evaluation",
        "EVALUATION",
        "Learn how to measure model performance and determine whether a model generalizes to unseen data.",
        "Evaluation helps identify whether a model is useful and whether it may be overfitting.",
        "A classification model can be evaluated using precision, recall and F1-score.",
        [
          "Train-Test Split",
          "Cross Validation",
          "Accuracy",
          "Precision",
          "Recall",
          "F1 Score"
        ]
      ),

      left: [
        topic(
          "train-test-split",
          "Train-Test Split",
          "EVALUATION",
          "Learn how datasets are divided into training and testing portions.",
          "Testing on unseen data provides a better estimate of generalization.",
          "A dataset can be divided into training and test sets before model evaluation.",
          [
            "Training Set",
            "Test Set",
            "Validation Set",
            "Data Leakage"
          ]
        ),

        topic(
          "cross-validation",
          "Cross Validation",
          "EVALUATION",
          "Learn how models can be evaluated across multiple training and validation splits.",
          "Cross-validation provides a more robust estimate of model performance.",
          "K-fold cross-validation can evaluate a model across several different data splits.",
          [
            "K-Fold",
            "Stratified K-Fold",
            "Validation",
            "Model Selection"
          ]
        )
      ],

      right: [
        topic(
          "classification-metrics",
          "Classification Metrics",
          "EVALUATION",
          "Learn metrics used to evaluate classification models.",
          "Different metrics are useful for different types of classification problems.",
          "A medical classifier may prioritize recall because missing a positive case can be costly.",
          [
            "Accuracy",
            "Precision",
            "Recall",
            "F1 Score",
            "ROC-AUC",
            "Confusion Matrix"
          ]
        ),

        topic(
          "model-overfitting",
          "Overfitting & Underfitting",
          "EVALUATION",
          "Learn why models may perform differently on training and unseen data.",
          "Recognizing overfitting is important when building reliable predictive models.",
          "A model with extremely high training accuracy but poor test accuracy may be overfitting.",
          [
            "Overfitting",
            "Underfitting",
            "Bias",
            "Variance",
            "Regularization"
          ]
        )
      ]
    },

    // =========================================================
    // 10. SQL & DATA ENGINEERING
    // =========================================================
    {
      id: "sql-data",
      title: "SQL & Data Engineering",
      category: "DATA",

      main: topic(
        "sql-data",
        "SQL & Data Engineering",
        "DATA",
        "Learn how to query, transform and organize data stored in databases.",
        "Data scientists frequently need to retrieve and prepare data before analysis.",
        "A data scientist can use SQL to combine customer and transaction tables before analysis.",
        [
          "SQL",
          "Joins",
          "Aggregation",
          "Database Design",
          "Data Pipelines"
        ]
      ),

      left: [
        topic(
          "sql-queries",
          "SQL Queries",
          "SQL",
          "Learn how to retrieve and manipulate data using SQL.",
          "SQL is one of the most important skills for working with organizational data.",
          "A query can find customers whose total spending exceeds a specific amount.",
          [
            "SELECT",
            "WHERE",
            "GROUP BY",
            "ORDER BY",
            "HAVING"
          ]
        ),

        topic(
          "sql-joins",
          "SQL Joins",
          "SQL",
          "Learn how to combine information from multiple relational tables.",
          "Real-world datasets are often distributed across several related tables.",
          "Customer information can be joined with transaction information using customer ID.",
          [
            "INNER JOIN",
            "LEFT JOIN",
            "RIGHT JOIN",
            "FULL JOIN",
            "Keys"
          ]
        )
      ],

      right: [
        topic(
          "sql-aggregation",
          "SQL Aggregation",
          "SQL",
          "Learn how to calculate summaries from database records.",
          "Aggregation is essential for business analytics and reporting.",
          "A query can calculate total sales for each product category.",
          [
            "COUNT",
            "SUM",
            "AVG",
            "MIN",
            "MAX",
            "GROUP BY"
          ]
        ),

        topic(
          "data-pipelines",
          "Data Pipelines",
          "DATA ENGINEERING",
          "Learn how data moves through collection, transformation and storage stages.",
          "Automated pipelines are required when data must be processed regularly.",
          "A daily pipeline can extract sales data, clean it and load it into an analytics database.",
          [
            "ETL",
            "ELT",
            "Extraction",
            "Transformation",
            "Loading",
            "Scheduling"
          ]
        )
      ]
    },

    // =========================================================
    // 11. ADVANCED DATA SCIENCE
    // =========================================================
    {
      id: "advanced-data-science",
      title: "Advanced Data Science",
      category: "ADVANCED",

      main: topic(
        "advanced-data-science",
        "Advanced Data Science",
        "ADVANCED",
        "Explore advanced techniques used to solve more complex analytical and predictive problems.",
        "Advanced techniques become useful when basic analysis and modelling are not sufficient.",
        "A recommendation system can use advanced modelling techniques to personalize results for users.",
        [
          "Feature Engineering",
          "Dimensionality Reduction",
          "Time Series",
          "Recommendation Systems",
          "NLP"
        ]
      ),

      left: [
        topic(
          "feature-engineering-ds",
          "Feature Engineering",
          "ADVANCED",
          "Learn how to create useful model inputs from raw data.",
          "Good features can improve model performance and make patterns easier to learn.",
          "A customer's purchase history can be converted into total spending and purchase frequency features.",
          [
            "Feature Creation",
            "Encoding",
            "Scaling",
            "Feature Selection",
            "Domain Knowledge"
          ]
        ),

        topic(
          "dimensionality-reduction",
          "Dimensionality Reduction",
          "ADVANCED",
          "Learn techniques for representing high-dimensional data using fewer dimensions.",
          "Reducing dimensions can simplify visualization and modelling.",
          "PCA can reduce many correlated numerical features into a smaller set of components.",
          [
            "PCA",
            "Feature Reduction",
            "Components",
            "Visualization"
          ]
        )
      ],

      right: [
        topic(
          "time-series",
          "Time Series Analysis",
          "ADVANCED",
          "Learn how to analyse and forecast data collected over time.",
          "Time-dependent data appears in sales, finance, weather and many other applications.",
          "A company can forecast next month's sales using historical sales data.",
          [
            "Trends",
            "Seasonality",
            "Forecasting",
            "Moving Average",
            "Time-based Features"
          ]
        ),

        topic(
          "recommendation-systems",
          "Recommendation Systems",
          "ADVANCED",
          "Learn how systems recommend products, content or actions based on user and item information.",
          "Recommendation systems are widely used in modern digital platforms.",
          "A learning platform can recommend courses based on a student's interests.",
          [
            "Collaborative Filtering",
            "Content-Based Filtering",
            "Similarity",
            "Recommendations"
          ]
        )
      ]
    },

    // =========================================================
    // 12. REAL-WORLD PROJECTS
    // =========================================================
    {
      id: "data-science-projects",
      title: "Build Real Data Science Projects",
      category: "BUILD",

      main: topic(
        "data-science-projects",
        "Real-World Data Science Projects",
        "BUILD",
        "Apply data science concepts to complete projects that solve practical problems.",
        "Projects demonstrate your ability to work with data from beginning to end.",
        "Build a placement prediction system using student academic and skill data.",
        [
          "Problem Definition",
          "Data Collection",
          "EDA",
          "Modeling",
          "Evaluation",
          "Deployment"
        ]
      ),

      left: [
        topic(
          "sales-analysis-project",
          "Sales Analysis Project",
          "PROJECT",
          "Build a project that analyses sales data and produces useful business insights.",
          "This project develops practical data cleaning, SQL and visualization skills.",
          "Analyse monthly sales and identify the highest-performing products.",
          [
            "Data Cleaning",
            "EDA",
            "SQL",
            "Visualization",
            "Business Insights"
          ]
        ),

        topic(
          "customer-churn-project",
          "Customer Churn Prediction",
          "PROJECT",
          "Build a machine learning system that predicts customers who may leave a service.",
          "This project combines data analysis, feature engineering and classification.",
          "Train a model using customer history to predict churn.",
          [
            "Data Cleaning",
            "Feature Engineering",
            "Classification",
            "Evaluation",
            "Prediction"
          ]
        )
      ],

      right: [
        topic(
          "recommendation-project",
          "Recommendation System",
          "PROJECT",
          "Build a system that recommends relevant products, courses or content.",
          "Recommendation systems demonstrate practical use of data and machine learning.",
          "Build a course recommendation system based on student interests.",
          [
            "User Data",
            "Similarity",
            "Recommendation",
            "Evaluation",
            "UI"
          ]
        ),

        topic(
          "data-science-capstone",
          "Data Science Capstone",
          "PROJECT",
          "Build one complete data science application from problem definition through deployment.",
          "A capstone demonstrates your ability to combine programming, statistics, analysis and machine learning.",
          "Build a complete placement prediction platform with data analysis, ML prediction and a web dashboard.",
          [
            "Problem Definition",
            "Data",
            "EDA",
            "Machine Learning",
            "Evaluation",
            "Deployment"
          ]
        )
      ]
    }
  ]
},

 "cybersecurity": {
  id: "cybersecurity",
  title: "Cybersecurity Roadmap",
  description:
    "A structured path from security fundamentals to network security, application security, ethical hacking, cloud security and incident response.",

  sections: [
    // =========================================================
    // 1. CYBERSECURITY FOUNDATIONS
    // =========================================================
    {
      id: "cyber-foundations",
      title: "Cybersecurity Foundations",
      category: "START",

      main: topic(
        "cyber-foundations",
        "Cybersecurity Fundamentals",
        "START",
        "Learn the fundamental concepts behind protecting computers, networks, applications and data.",
        "Security fundamentals provide the foundation for understanding more advanced cybersecurity concepts.",
        "A company protects employee accounts, computers and internal systems from unauthorized access.",
        [
          "CIA Triad",
          "Threats",
          "Vulnerabilities",
          "Risk",
          "Security Controls",
          "Attack Surface"
        ]
      ),

      left: [
        topic(
          "cia-triad",
          "CIA Triad",
          "FOUNDATION",
          "Learn the three fundamental security objectives: confidentiality, integrity and availability.",
          "The CIA triad provides a basic framework for understanding security requirements.",
          "A banking system must keep customer information confidential, accurate and available.",
          [
            "Confidentiality",
            "Integrity",
            "Availability",
            "Security Objectives"
          ]
        ),

        topic(
          "security-threats",
          "Security Threats",
          "FOUNDATION",
          "Learn about common threats that can compromise systems and information.",
          "Understanding threats helps security professionals identify potential attack scenarios.",
          "Phishing can trick users into revealing their login credentials.",
          [
            "Malware",
            "Phishing",
            "Social Engineering",
            "Insider Threats",
            "Data Theft"
          ]
        )
      ],

      right: [
        topic(
          "vulnerabilities",
          "Vulnerabilities",
          "FOUNDATION",
          "Learn how weaknesses in software, systems or configurations can be exploited.",
          "Identifying vulnerabilities is an important part of preventing attacks.",
          "An outdated software package may contain a known security vulnerability.",
          [
            "Software Vulnerabilities",
            "Configuration Issues",
            "Weak Passwords",
            "Unpatched Systems"
          ]
        ),

        topic(
          "risk-management",
          "Risk Management",
          "FOUNDATION",
          "Learn how organizations identify, assess and reduce cybersecurity risks.",
          "Security resources must be prioritized according to potential impact and likelihood.",
          "A company may prioritize protecting its payment database because a breach could have significant consequences.",
          [
            "Risk",
            "Impact",
            "Likelihood",
            "Risk Assessment",
            "Mitigation"
          ]
        )
      ]
    },

    // =========================================================
    // 2. NETWORKING
    // =========================================================
    {
      id: "cyber-networking",
      title: "Networking Fundamentals",
      category: "CORE",

      main: topic(
        "cyber-networking",
        "Computer Networking",
        "CORE",
        "Learn how computers communicate across networks and the protocols that enable communication.",
        "Networking knowledge is essential for understanding network attacks and defenses.",
        "A web browser communicates with a remote server using network protocols.",
        [
          "OSI Model",
          "TCP/IP",
          "IP Addresses",
          "Ports",
          "DNS",
          "Routing"
        ]
      ),

      left: [
        topic(
          "osi-model",
          "OSI Model",
          "NETWORKING",
          "Learn the seven conceptual layers used to understand network communication.",
          "The OSI model helps organize networking concepts and troubleshoot communication problems.",
          "A network engineer can identify whether a problem belongs to the transport or application layer.",
          [
            "Physical",
            "Data Link",
            "Network",
            "Transport",
            "Session",
            "Presentation",
            "Application"
          ]
        ),

        topic(
          "tcp-ip",
          "TCP/IP",
          "NETWORKING",
          "Learn the protocols that form the foundation of modern Internet communication.",
          "Security professionals need to understand how network traffic is transported.",
          "A browser uses TCP/IP-based communication when accessing a web application.",
          [
            "TCP",
            "IP",
            "UDP",
            "Packets",
            "Ports"
          ]
        )
      ],

      right: [
        topic(
          "ip-addressing",
          "IP Addressing",
          "NETWORKING",
          "Learn how devices are identified and addressed on networks.",
          "IP addressing is fundamental to network communication and security analysis.",
          "A server can be reached through its IP address on a network.",
          [
            "IPv4",
            "IPv6",
            "Public IP",
            "Private IP",
            "Subnetting"
          ]
        ),

        topic(
          "dns-security",
          "DNS",
          "NETWORKING",
          "Learn how domain names are translated into network addresses.",
          "DNS is an important part of Internet communication and can also be involved in security attacks.",
          "When a user enters a website name, DNS helps locate the corresponding server.",
          [
            "Domain Names",
            "DNS Records",
            "Name Resolution",
            "DNS Security"
          ]
        )
      ]
    },

    // =========================================================
    // 3. LINUX
    // =========================================================
    {
      id: "linux-security",
      title: "Linux & System Fundamentals",
      category: "SYSTEMS",

      main: topic(
        "linux-security",
        "Linux Fundamentals",
        "SYSTEMS",
        "Learn Linux commands, filesystems, permissions and system administration basics.",
        "Linux is widely used in servers, cloud infrastructure and security environments.",
        "A security analyst can inspect Linux logs and processes while investigating an incident.",
        [
          "Linux Commands",
          "Filesystems",
          "Processes",
          "Permissions",
          "Shell",
          "Logs"
        ]
      ),

      left: [
        topic(
          "linux-commands",
          "Linux Commands",
          "LINUX",
          "Learn essential commands for navigating and managing Linux systems.",
          "Command-line skills are important for security analysis and server administration.",
          "A user can inspect files and running processes from the terminal.",
          [
            "ls",
            "cd",
            "pwd",
            "cp",
            "mv",
            "grep",
            "find"
          ]
        ),

        topic(
          "linux-permissions",
          "Linux Permissions",
          "LINUX",
          "Learn how Linux controls access to files and system resources.",
          "Incorrect permissions can expose sensitive information or allow unauthorized actions.",
          "A private configuration file should not be readable by every system user.",
          [
            "Users",
            "Groups",
            "Read",
            "Write",
            "Execute",
            "chmod"
          ]
        )
      ],

      right: [
        topic(
          "linux-processes",
          "Processes & Services",
          "LINUX",
          "Learn how programs and services run on Linux systems.",
          "Security investigations often require identifying suspicious processes or services.",
          "An analyst can inspect running processes to identify unexpected programs.",
          [
            "Processes",
            "Services",
            "Background tasks",
            "Process IDs",
            "System monitoring"
          ]
        ),

        topic(
          "linux-shell",
          "Linux Shell",
          "LINUX",
          "Learn how to automate system tasks using the command line and shell scripts.",
          "Shell skills improve efficiency when working with servers and security tools.",
          "A script can collect system information from multiple servers.",
          [
            "Bash",
            "Variables",
            "Commands",
            "Pipelines",
            "Shell Scripts"
          ]
        )
      ]
    },

    // =========================================================
    // 4. CRYPTOGRAPHY
    // =========================================================
    {
      id: "cryptography",
      title: "Cryptography",
      category: "CORE",

      main: topic(
        "cryptography",
        "Cryptography",
        "CORE",
        "Learn how mathematical techniques protect information and enable secure communication.",
        "Cryptography is fundamental to authentication, confidentiality and secure communication.",
        "HTTPS uses cryptographic mechanisms to protect data exchanged between a browser and server.",
        [
          "Encryption",
          "Decryption",
          "Hashing",
          "Digital Signatures",
          "Keys",
          "Certificates"
        ]
      ),

      left: [
        topic(
          "symmetric-encryption",
          "Symmetric Encryption",
          "CRYPTOGRAPHY",
          "Learn encryption methods that use the same secret key for encryption and decryption.",
          "Symmetric encryption is efficient for protecting large amounts of data.",
          "A system can encrypt a stored file using a secret key.",
          [
            "Secret Keys",
            "AES",
            "Encryption",
            "Decryption",
            "Key Management"
          ]
        ),

        topic(
          "asymmetric-encryption",
          "Asymmetric Encryption",
          "CRYPTOGRAPHY",
          "Learn encryption using public and private key pairs.",
          "Asymmetric cryptography enables secure key exchange and digital signatures.",
          "A public key can be shared while the corresponding private key remains secret.",
          [
            "Public Key",
            "Private Key",
            "RSA",
            "Key Exchange",
            "Digital Signatures"
          ]
        )
      ],

      right: [
        topic(
          "hashing",
          "Hashing",
          "CRYPTOGRAPHY",
          "Learn how data can be transformed into fixed-length hash values.",
          "Hashing is commonly used for integrity checks and secure password storage when combined with appropriate password hashing methods.",
          "A password should be stored using a secure password hashing algorithm rather than plaintext.",
          [
            "Hash Functions",
            "SHA-256",
            "Password Hashing",
            "Integrity",
            "Salting"
          ]
        ),

        topic(
          "digital-certificates",
          "Digital Certificates",
          "CRYPTOGRAPHY",
          "Learn how certificates help establish trust in secure communications.",
          "Certificates are an important part of HTTPS and public key infrastructure.",
          "A website uses a TLS certificate to establish a secure connection.",
          [
            "TLS",
            "Certificates",
            "Public Key Infrastructure",
            "Certificate Authorities"
          ]
        )
      ]
    },

    // =========================================================
    // 5. WEB SECURITY
    // =========================================================
    {
      id: "web-security",
      title: "Web Application Security",
      category: "APPLICATION SECURITY",

      main: topic(
        "web-security",
        "Web Security",
        "APPLICATION SECURITY",
        "Learn how web applications can be attacked and how developers can reduce common vulnerabilities.",
        "Web applications process user input and sensitive information, making application security essential.",
        "A secure login system validates input and protects authentication credentials.",
        [
          "OWASP",
          "Authentication",
          "Authorization",
          "Input Validation",
          "Secure APIs",
          "HTTPS"
        ]
      ),

      left: [
        topic(
          "sql-injection",
          "SQL Injection",
          "WEB SECURITY",
          "Learn how unsafe database queries can allow malicious input to affect database operations.",
          "Understanding SQL injection helps developers build safer database interactions.",
          "Parameterized queries help prevent user input from being interpreted as SQL commands.",
          [
            "SQL Injection",
            "Parameterized Queries",
            "Prepared Statements",
            "Input Validation"
          ]
        ),

        topic(
          "xss",
          "Cross-Site Scripting",
          "WEB SECURITY",
          "Learn how malicious scripts can be injected into web pages.",
          "XSS can affect users who interact with vulnerable web applications.",
          "A web application should safely handle user-generated content before displaying it.",
          [
            "Stored XSS",
            "Reflected XSS",
            "Output Encoding",
            "Content Security Policy"
          ]
        )
      ],

      right: [
        topic(
          "csrf",
          "CSRF",
          "WEB SECURITY",
          "Learn how attackers can attempt to make authenticated users perform unintended actions.",
          "Understanding request protection is important for secure web applications.",
          "A sensitive action can require an appropriate anti-CSRF mechanism.",
          [
            "CSRF",
            "Tokens",
            "SameSite Cookies",
            "Request Validation"
          ]
        ),

        topic(
          "owasp-top10",
          "OWASP Top 10",
          "WEB SECURITY",
          "Learn about widely recognized categories of web application security risks.",
          "OWASP provides a useful framework for learning common web security problems.",
          "Developers can review an application against common security risk categories.",
          [
            "Access Control",
            "Injection",
            "Authentication",
            "Security Misconfiguration",
            "Cryptographic Failures"
          ]
        )
      ]
    },

    // =========================================================
    // 6. NETWORK SECURITY
    // =========================================================
    {
      id: "network-security",
      title: "Network Security",
      category: "NETWORK",

      main: topic(
        "network-security",
        "Network Security",
        "NETWORK",
        "Learn how networks are monitored and protected against unauthorized access and attacks.",
        "Network security helps protect communication and infrastructure from threats.",
        "An organization can use firewalls and monitoring systems to protect its internal network.",
        [
          "Firewalls",
          "IDS",
          "IPS",
          "VPN",
          "Network Monitoring",
          "Segmentation"
        ]
      ),

      left: [
        topic(
          "firewalls",
          "Firewalls",
          "NETWORK SECURITY",
          "Learn how firewalls control network traffic according to security rules.",
          "Firewalls provide an important layer of network protection.",
          "A firewall can restrict incoming traffic to only approved services.",
          [
            "Rules",
            "Ports",
            "Inbound Traffic",
            "Outbound Traffic",
            "Filtering"
          ]
        ),

        topic(
          "ids-ips",
          "IDS & IPS",
          "NETWORK SECURITY",
          "Learn how intrusion detection and prevention systems identify suspicious network activity.",
          "These systems can help organizations detect or block malicious traffic.",
          "An IDS can generate an alert when traffic matches a suspicious pattern.",
          [
            "Intrusion Detection",
            "Intrusion Prevention",
            "Alerts",
            "Network Monitoring"
          ]
        )
      ],

      right: [
        topic(
          "vpn",
          "VPN",
          "NETWORK SECURITY",
          "Learn how virtual private networks provide protected network connections.",
          "VPNs are commonly used to secure remote access to organizational resources.",
          "An employee can use a VPN to securely access internal company systems remotely.",
          [
            "VPN",
            "Tunneling",
            "Encryption",
            "Remote Access"
          ]
        ),

        topic(
          "network-segmentation",
          "Network Segmentation",
          "NETWORK SECURITY",
          "Learn how networks can be divided into separate segments to limit access and reduce exposure.",
          "Segmentation can reduce the impact of a compromised system.",
          "A company can separate employee devices from critical database servers.",
          [
            "Subnets",
            "VLANs",
            "Segmentation",
            "Access Control"
          ]
        )
      ]
    },

    // =========================================================
    // 7. ETHICAL HACKING
    // =========================================================
    {
      id: "ethical-hacking",
      title: "Ethical Hacking",
      category: "OFFENSIVE SECURITY",

      main: topic(
        "ethical-hacking",
        "Ethical Hacking",
        "OFFENSIVE SECURITY",
        "Learn authorized security testing techniques used to identify weaknesses in systems and applications.",
        "Security testing helps organizations discover vulnerabilities before malicious attackers exploit them.",
        "A security team can perform an authorized penetration test on a company's web application.",
        [
          "Reconnaissance",
          "Scanning",
          "Vulnerability Assessment",
          "Penetration Testing",
          "Reporting"
        ]
      ),

      left: [
        topic(
          "reconnaissance",
          "Reconnaissance",
          "ETHICAL HACKING",
          "Learn how security testers gather information about an authorized target.",
          "Understanding the attack surface is an important part of security testing.",
          "A penetration tester can identify the domains and technologies belonging to an authorized organization.",
          [
            "Information Gathering",
            "Attack Surface",
            "Asset Discovery",
            "Technology Identification"
          ]
        ),

        topic(
          "vulnerability-scanning",
          "Vulnerability Scanning",
          "ETHICAL HACKING",
          "Learn how authorized scanners identify potentially vulnerable services and software.",
          "Automated scanning can help security teams identify issues efficiently.",
          "A security team can scan its own servers for outdated software.",
          [
            "Scanning",
            "Vulnerabilities",
            "Security Tools",
            "Reports",
            "Remediation"
          ]
        )
      ],

      right: [
        topic(
          "penetration-testing",
          "Penetration Testing",
          "ETHICAL HACKING",
          "Learn the methodology used to safely test whether identified weaknesses can be exploited within an authorized scope.",
          "Penetration testing provides evidence about the practical impact of vulnerabilities.",
          "An authorized tester can assess whether a web application's access controls can be bypassed.",
          [
            "Scope",
            "Testing",
            "Evidence",
            "Impact",
            "Remediation"
          ]
        ),

       topic(
  "security-reporting",
  "Security Reporting",
  "ETHICAL HACKING",
  "Learn how security findings are documented and communicated to system owners.",
  "A technical vulnerability is only useful to an organization when it can be understood and fixed.",
  "A penetration tester can create a report explaining a vulnerability, its impact, evidence and recommended remediation.",
  [
    "Finding",
    "Severity",
    "Evidence",
    "Impact",
    "Recommendation"
  ]
)
      ]
    },

    // =========================================================
    // 8. DIGITAL FORENSICS
    // =========================================================
    {
      id: "digital-forensics",
      title: "Digital Forensics",
      category: "DEFENSIVE SECURITY",

      main: topic(
        "digital-forensics",
        "Digital Forensics",
        "DEFENSIVE SECURITY",
        "Learn how digital evidence can be collected, preserved and analysed during security investigations.",
        "Forensics helps organizations understand what happened during a security incident.",
        "An analyst can examine system logs and disk evidence after a suspected compromise.",
        [
          "Evidence",
          "Disk Analysis",
          "Memory Analysis",
          "Logs",
          "Chain of Custody"
        ]
      ),

      left: [
        topic(
          "forensic-evidence",
          "Digital Evidence",
          "FORENSICS",
          "Learn how digital evidence is identified and preserved during investigations.",
          "Evidence must be handled carefully to maintain its integrity.",
          "Investigators can preserve relevant system files and logs after an incident.",
          [
            "Evidence Collection",
            "Integrity",
            "Metadata",
            "Preservation"
          ]
        ),

        topic(
          "disk-forensics",
          "Disk Forensics",
          "FORENSICS",
          "Learn how storage devices can be examined for useful evidence.",
          "Disk analysis can reveal files, activity and artifacts relevant to investigations.",
          "An investigator can analyse a disk image to identify suspicious files.",
          [
            "Disk Images",
            "File Systems",
            "Deleted Files",
            "Metadata",
            "Artifacts"
          ]
        )
      ],

      right: [
        topic(
          "memory-forensics",
          "Memory Forensics",
          "FORENSICS",
          "Learn how volatile memory can be analysed to investigate running processes and system activity.",
          "Memory may contain information that is not available on disk.",
          "An analyst can examine memory to identify suspicious processes running during an incident.",
          [
            "RAM",
            "Processes",
            "Memory Artifacts",
            "Volatile Data"
          ]
        ),

        topic(
          "log-analysis",
          "Log Analysis",
          "FORENSICS",
          "Learn how system and application logs can be analysed during investigations.",
          "Logs provide valuable records of events that occurred within systems.",
          "Login logs can help identify unusual authentication activity.",
          [
            "System Logs",
            "Application Logs",
            "Authentication Logs",
            "Timestamps",
            "Correlation"
          ]
        )
      ]
    },

    // =========================================================
    // 9. INCIDENT RESPONSE
    // =========================================================
    {
      id: "incident-response",
      title: "Incident Response",
      category: "DEFENSIVE SECURITY",

      main: topic(
        "incident-response",
        "Incident Response",
        "DEFENSIVE SECURITY",
        "Learn how organizations prepare for, detect, contain and recover from cybersecurity incidents.",
        "A structured response reduces the impact of security incidents.",
        "A security team can isolate a compromised machine while investigating the incident.",
        [
          "Preparation",
          "Detection",
          "Containment",
          "Eradication",
          "Recovery",
          "Lessons Learned"
        ]
      ),

      left: [
        topic(
          "incident-detection",
          "Incident Detection",
          "INCIDENT RESPONSE",
          "Learn how suspicious security events are identified and investigated.",
          "Fast detection can reduce the time attackers remain inside a system.",
          "An unusual login from an unexpected location can trigger an investigation.",
          [
            "Alerts",
            "Logs",
            "Indicators",
            "Monitoring",
            "Investigation"
          ]
        ),

        topic(
          "incident-containment",
          "Incident Containment",
          "INCIDENT RESPONSE",
          "Learn how organizations limit the spread and impact of an active security incident.",
          "Containment helps prevent additional systems from being affected.",
          "A compromised endpoint may be isolated from the organization's network.",
          [
            "Isolation",
            "Network Blocking",
            "Account Disablement",
            "Containment Strategy"
          ]
        )
      ],

      right: [
        topic(
          "incident-recovery",
          "Recovery",
          "INCIDENT RESPONSE",
          "Learn how systems are restored after a security incident.",
          "Recovery returns affected systems to normal operation while addressing the underlying issue.",
          "A compromised server can be rebuilt from a trusted image after investigation.",
          [
            "Restoration",
            "Backups",
            "System Validation",
            "Monitoring"
          ]
        ),

        topic(
          "lessons-learned",
          "Lessons Learned",
          "INCIDENT RESPONSE",
          "Learn how organizations review incidents to improve future security.",
          "Post-incident analysis helps prevent similar incidents from happening again.",
          "A company can update security controls after identifying how an attacker gained access.",
          [
            "Post-Incident Review",
            "Root Cause",
            "Improvements",
            "Security Controls"
          ]
        )
      ]
    },

    // =========================================================
    // 10. CLOUD SECURITY
    // =========================================================
    {
      id: "cloud-security",
      title: "Cloud Security",
      category: "CLOUD",

      main: topic(
        "cloud-security",
        "Cloud Security",
        "CLOUD",
        "Learn how cloud infrastructure, applications and data are protected.",
        "Modern organizations increasingly use cloud infrastructure and require security controls for cloud environments.",
        "A cloud application can restrict access to storage and databases using identity and access policies.",
        [
          "Cloud IAM",
          "Network Security",
          "Data Protection",
          "Secrets",
          "Monitoring"
        ]
      ),

      left: [
        topic(
          "cloud-iam",
          "Cloud IAM",
          "CLOUD SECURITY",
          "Learn how identities and permissions are managed in cloud environments.",
          "Incorrect permissions can expose cloud resources.",
          "A developer may be given access only to the resources required for their application.",
          [
            "Identity",
            "Roles",
            "Policies",
            "Least Privilege",
            "Access Control"
          ]
        ),

        topic(
          "cloud-networking",
          "Cloud Network Security",
          "CLOUD SECURITY",
          "Learn how cloud networks can be designed and protected.",
          "Cloud applications require controlled communication between services.",
          "A database can be placed in a private network while only the application server can access it.",
          [
            "Virtual Networks",
            "Subnets",
            "Security Groups",
            "Private Networks"
          ]
        )
      ],

      right: [
        topic(
          "cloud-secrets",
          "Secrets Management",
          "CLOUD SECURITY",
          "Learn how API keys, passwords and other sensitive credentials should be protected.",
          "Exposed credentials can give attackers access to cloud resources.",
          "An application can retrieve database credentials from a managed secrets system instead of storing them in source code.",
          [
            "API Keys",
            "Secrets",
            "Environment Variables",
            "Key Management"
          ]
        ),

        topic(
          "cloud-monitoring",
          "Cloud Monitoring",
          "CLOUD SECURITY",
          "Learn how cloud activity and resources can be monitored for security events.",
          "Monitoring helps detect unusual activity and configuration problems.",
          "An organization can alert when an unusual administrative action occurs.",
          [
            "Logs",
            "Metrics",
            "Alerts",
            "Audit Trails",
            "Security Monitoring"
          ]
        )
      ]
    },

    // =========================================================
    // 11. SECURITY OPERATIONS
    // =========================================================
    {
      id: "security-operations",
      title: "Security Operations",
      category: "ADVANCED",

      main: topic(
        "security-operations",
        "Security Operations",
        "ADVANCED",
        "Learn how security teams continuously monitor systems, investigate alerts and respond to threats.",
        "Security operations provide continuous protection for organizational infrastructure.",
        "A SOC team monitors security alerts and investigates suspicious events.",
        [
          "SOC",
          "SIEM",
          "Threat Detection",
          "Monitoring",
          "Incident Response"
        ]
      ),

      left: [
        topic(
          "soc",
          "Security Operations Center",
          "SECURITY OPERATIONS",
          "Learn how SOC teams monitor and investigate security events.",
          "SOC operations provide continuous security monitoring.",
          "Analysts investigate alerts generated by endpoint and network monitoring systems.",
          [
            "SOC",
            "Security Analysts",
            "Alerts",
            "Monitoring",
            "Investigation"
          ]
        ),

        topic(
          "siem",
          "SIEM",
          "SECURITY OPERATIONS",
          "Learn how security information and event management systems collect and correlate security logs.",
          "Centralized event analysis helps identify suspicious activity across systems.",
          "A SIEM can correlate authentication events from multiple servers.",
          [
            "Logs",
            "Event Correlation",
            "Alerts",
            "Dashboards",
            "Security Analytics"
          ]
        )
      ],

      right: [
        topic(
          "threat-detection",
          "Threat Detection",
          "SECURITY OPERATIONS",
          "Learn how suspicious behaviour and potential threats are identified.",
          "Detection is a key part of defending systems against attacks.",
          "Repeated failed logins followed by a successful login may trigger investigation.",
          [
            "Indicators",
            "Behaviour",
            "Alerts",
            "Detection Rules",
            "Threat Intelligence"
          ]
        ),

        topic(
          "security-monitoring",
          "Security Monitoring",
          "SECURITY OPERATIONS",
          "Learn how security events can be monitored continuously.",
          "Continuous monitoring helps organizations identify problems earlier.",
          "An organization can monitor authentication, network and endpoint events.",
          [
            "Monitoring",
            "Logs",
            "Alerts",
            "Dashboards",
            "Metrics"
          ]
        )
      ]
    },

    // =========================================================
    // 12. SECURITY PROJECTS
    // =========================================================
    {
      id: "cyber-projects",
      title: "Build Cybersecurity Projects",
      category: "BUILD",

      main: topic(
        "cyber-projects",
        "Cybersecurity Projects",
        "BUILD",
        "Apply cybersecurity concepts through defensive, analytical and authorized security projects.",
        "Practical projects help connect security theory with real systems and workflows.",
        "Build a security monitoring dashboard that analyses authentication logs and highlights suspicious activity.",
        [
          "Security Analysis",
          "Logs",
          "Detection",
          "Dashboard",
          "Reporting"
        ]
      ),

      left: [
        topic(
          "security-scanner",
          "Vulnerability Scanner",
          "PROJECT",
          "Build an authorized tool that checks systems for known configuration or software vulnerabilities.",
          "This project demonstrates vulnerability assessment concepts.",
          "Build a scanner for your own lab environment that checks for outdated services.",
          [
            "Scanning",
            "Service Detection",
            "Vulnerabilities",
            "Reporting",
            "Remediation"
          ]
        ),

        topic(
          "password-security",
          "Password Security Project",
          "PROJECT",
          "Build an educational application demonstrating secure password handling and authentication concepts.",
          "Authentication security is fundamental to most applications.",
          "Build a registration system that securely hashes passwords and validates login attempts.",
          [
            "Password Hashing",
            "Authentication",
            "Validation",
            "Sessions",
            "Security"
          ]
        )
      ],

      right: [
        topic(
          "security-monitoring-project",
          "Security Monitoring Dashboard",
          "PROJECT",
          "Build a dashboard that collects and visualizes security-related events.",
          "This project demonstrates defensive security and monitoring concepts.",
          "Display login attempts and flag unusual authentication activity.",
          [
            "Logs",
            "Charts",
            "Alerts",
            "Detection Rules",
            "Dashboard"
          ]
        ),

        topic(
          "cyber-capstone",
          "Cybersecurity Capstone",
          "PROJECT",
          "Build a complete security-focused system combining monitoring, analysis and response concepts.",
          "A capstone demonstrates practical understanding across multiple cybersecurity areas.",
          "Build a security operations dashboard with log analysis, alert generation and incident tracking.",
          [
            "Network Security",
            "Log Analysis",
            "Threat Detection",
            "Incident Response",
            "Dashboard"
          ]
        )
      ]
    }
  ]
},

  "cloud-devops": {
  id: "cloud-devops",
  title: "Cloud & DevOps Roadmap",
  description:
    "A structured path from cloud fundamentals to infrastructure, containers, CI/CD, monitoring, security and production deployment.",

  sections: [
    // =========================================================
    // 1. CLOUD FUNDAMENTALS
    // =========================================================
    {
      id: "cloud-foundations",
      title: "Cloud Computing Foundations",
      category: "START",

      main: topic(
        "cloud-foundations",
        "Cloud Computing",
        "START",
        "Learn the fundamental concepts behind cloud computing and how organizations use cloud infrastructure.",
        "Cloud computing provides scalable computing resources without requiring organizations to manage all physical infrastructure themselves.",
        "A startup can deploy its web application on cloud servers instead of purchasing physical servers.",
        [
          "Cloud Computing",
          "Cloud Providers",
          "Regions",
          "Availability Zones",
          "Scalability",
          "Pay-as-you-go"
        ]
      ),

      left: [
        topic(
          "cloud-service-models",
          "Cloud Service Models",
          "FOUNDATION",
          "Learn the different levels of cloud services provided by cloud platforms.",
          "Understanding service models helps developers choose the right type of cloud service.",
          "A developer may use a managed database instead of managing the database server manually.",
          [
            "IaaS",
            "PaaS",
            "SaaS",
            "Managed Services"
          ]
        ),

        topic(
          "cloud-deployment-models",
          "Cloud Deployment Models",
          "FOUNDATION",
          "Learn how cloud infrastructure can be organized and deployed.",
          "Different organizations have different infrastructure and compliance requirements.",
          "A company can combine private infrastructure with public cloud services.",
          [
            "Public Cloud",
            "Private Cloud",
            "Hybrid Cloud",
            "Multi-Cloud"
          ]
        )
      ],

      right: [
        topic(
          "cloud-regions",
          "Regions & Availability Zones",
          "CLOUD",
          "Learn how cloud providers organize infrastructure geographically.",
          "Understanding regions and availability zones is important for reliability and latency.",
          "An application can deploy servers in multiple availability zones to improve availability.",
          [
            "Regions",
            "Availability Zones",
            "Latency",
            "High Availability"
          ]
        ),

        topic(
          "cloud-scalability",
          "Cloud Scalability",
          "CLOUD",
          "Learn how cloud resources can be scaled according to application demand.",
          "Applications may experience changing traffic and resource requirements.",
          "An e-commerce application can increase computing resources during a large sale.",
          [
            "Scaling",
            "Auto Scaling",
            "Vertical Scaling",
            "Horizontal Scaling"
          ]
        )
      ]
    },

    // =========================================================
    // 2. LINUX
    // =========================================================
    {
      id: "cloud-linux",
      title: "Linux & System Administration",
      category: "SYSTEMS",

      main: topic(
        "cloud-linux",
        "Linux",
        "SYSTEMS",
        "Learn Linux administration, commands, processes, permissions and system configuration.",
        "Linux is widely used on cloud servers and DevOps infrastructure.",
        "A DevOps engineer can connect to a Linux server and manage applications from the command line.",
        [
          "Linux Commands",
          "Filesystems",
          "Processes",
          "Permissions",
          "Users",
          "Shell"
        ]
      ),

      left: [
        topic(
          "linux-commands-cloud",
          "Linux Commands",
          "LINUX",
          "Learn essential commands for navigating and managing Linux systems.",
          "Command-line knowledge is essential for working with remote cloud servers.",
          "Use SSH to connect to a server and inspect application logs.",
          [
            "ls",
            "cd",
            "pwd",
            "cp",
            "mv",
            "grep",
            "find"
          ]
        ),

        topic(
          "linux-users-permissions",
          "Users & Permissions",
          "LINUX",
          "Learn how Linux controls access to files and system resources.",
          "Proper permissions help protect cloud servers from unauthorized access.",
          "A deployment directory can be accessible only to the application user.",
          [
            "Users",
            "Groups",
            "Permissions",
            "chmod",
            "chown",
            "sudo"
          ]
        )
      ],

      right: [
        topic(
          "linux-processes-cloud",
          "Processes & Services",
          "LINUX",
          "Learn how applications and services run on Linux systems.",
          "Understanding processes helps diagnose application and server problems.",
          "A developer can check whether a backend service is currently running.",
          [
            "Processes",
            "Services",
            "Process IDs",
            "System Services",
            "Monitoring"
          ]
        ),

        topic(
          "bash-scripting",
          "Bash Scripting",
          "LINUX",
          "Learn how to automate repetitive server and system administration tasks.",
          "Automation reduces manual work and makes operations more consistent.",
          "A script can automatically back up application logs every night.",
          [
            "Variables",
            "Commands",
            "Loops",
            "Conditions",
            "Shell Scripts"
          ]
        )
      ]
    },

    // =========================================================
    // 3. NETWORKING
    // =========================================================
    {
      id: "cloud-networking",
      title: "Networking",
      category: "CORE",

      main: topic(
        "cloud-networking",
        "Cloud Networking",
        "CORE",
        "Learn the networking concepts required to connect and secure cloud infrastructure.",
        "Cloud applications depend on reliable network communication between users, servers and services.",
        "A frontend server can communicate with a backend server through a controlled network connection.",
        [
          "IP Addresses",
          "DNS",
          "Ports",
          "Subnets",
          "Routing",
          "Firewalls"
        ]
      ),

      left: [
        topic(
          "ip-subnets",
          "IP Addresses & Subnets",
          "NETWORKING",
          "Learn how IP addresses and subnets organize devices and resources on networks.",
          "Subnetting is important when designing secure cloud networks.",
          "A database server can be placed inside a private subnet.",
          [
            "IPv4",
            "Private IP",
            "Public IP",
            "Subnets",
            "CIDR"
          ]
        ),

        topic(
          "dns-cloud",
          "DNS",
          "NETWORKING",
          "Learn how domain names are mapped to servers and cloud resources.",
          "DNS allows users to access applications through human-readable domain names.",
          "A domain can point to a cloud-hosted web application.",
          [
            "DNS",
            "Records",
            "A Record",
            "CNAME",
            "Domain Names"
          ]
        )
      ],

      right: [
        topic(
          "ports-protocols",
          "Ports & Protocols",
          "NETWORKING",
          "Learn how network ports and protocols identify different types of communication.",
          "Correct port configuration is important for both connectivity and security.",
          "An HTTPS application commonly accepts traffic through port 443.",
          [
            "TCP",
            "UDP",
            "HTTP",
            "HTTPS",
            "SSH",
            "Ports"
          ]
        ),

        topic(
          "cloud-firewalls",
          "Firewalls & Security Groups",
          "NETWORKING",
          "Learn how cloud platforms control inbound and outbound network traffic.",
          "Network filtering prevents unauthorized access to infrastructure.",
          "A database can allow connections only from the backend server.",
          [
            "Firewall Rules",
            "Security Groups",
            "Inbound Rules",
            "Outbound Rules",
            "Network ACLs"
          ]
        )
      ]
    },

    // =========================================================
    // 4. CLOUD SERVICES
    // =========================================================
    {
      id: "cloud-services",
      title: "Cloud Services",
      category: "CORE",

      main: topic(
        "cloud-services",
        "Cloud Services",
        "CORE",
        "Learn the major categories of services provided by cloud platforms.",
        "Cloud providers offer managed services for computing, storage, databases and networking.",
        "A web application can use cloud compute, object storage and a managed database.",
        [
          "Compute",
          "Storage",
          "Databases",
          "Networking",
          "Identity",
          "Monitoring"
        ]
      ),

      left: [
        topic(
          "cloud-compute",
          "Cloud Compute",
          "CLOUD SERVICES",
          "Learn how applications and workloads run on cloud computing resources.",
          "Compute services provide the processing power required by applications.",
          "A Node.js backend can run on a cloud virtual machine.",
          [
            "Virtual Machines",
            "Instances",
            "Compute",
            "Auto Scaling",
            "Serverless"
          ]
        ),

        topic(
          "cloud-storage",
          "Cloud Storage",
          "CLOUD SERVICES",
          "Learn how files and objects can be stored using cloud storage services.",
          "Cloud storage is commonly used for images, documents, backups and application assets.",
          "A student platform can store uploaded resumes in object storage.",
          [
            "Object Storage",
            "Buckets",
            "Files",
            "Backups",
            "Storage Classes"
          ]
        )
      ],

      right: [
        topic(
          "managed-databases",
          "Managed Databases",
          "CLOUD SERVICES",
          "Learn how cloud providers offer managed relational and NoSQL databases.",
          "Managed databases reduce the amount of infrastructure administration required.",
          "A web application can use a managed PostgreSQL database.",
          [
            "PostgreSQL",
            "MySQL",
            "MongoDB",
            "Backups",
            "Scaling"
          ]
        ),

        topic(
          "serverless",
          "Serverless Computing",
          "CLOUD SERVICES",
          "Learn how applications can run without directly managing traditional servers.",
          "Serverless platforms can simplify deployment for certain workloads.",
          "An API endpoint can execute a function only when a request arrives.",
          [
            "Functions",
            "Events",
            "Auto Scaling",
            "Stateless Functions"
          ]
        )
      ]
    },

    // =========================================================
    // 5. GIT
    // =========================================================
    {
      id: "devops-git",
      title: "Git & Collaboration",
      category: "TOOLS",

      main: topic(
        "devops-git",
        "Git & GitHub",
        "TOOLS",
        "Learn version control and collaboration workflows used by software development teams.",
        "DevOps workflows depend heavily on version control.",
        "A developer creates a feature branch, commits changes and opens a pull request.",
        [
          "Git",
          "GitHub",
          "Branches",
          "Commits",
          "Pull Requests",
          "Code Review"
        ]
      ),

      left: [
        topic(
          "git-basics-devops",
          "Git Basics",
          "GIT",
          "Learn how to track changes and maintain software versions using Git.",
          "Version control provides a history of code changes and enables collaboration.",
          "Commit a completed feature before pushing it to the remote repository.",
          [
            "git init",
            "git add",
            "git commit",
            "git status",
            "git log"
          ]
        ),

        topic(
          "git-branching-devops",
          "Git Branching",
          "GIT",
          "Learn how branches allow developers to work on features independently.",
          "Branching is essential for team-based development workflows.",
          "Create a deployment branch for testing production configuration.",
          [
            "Branches",
            "Merge",
            "Rebase",
            "Merge Conflicts",
            "Feature Branches"
          ]
        )
      ],

      right: [
        topic(
          "github-actions",
          "GitHub Actions",
          "CI/CD",
          "Learn how GitHub repositories can automatically run development workflows.",
          "GitHub Actions is commonly used to automate testing and deployment.",
          "A push to the main branch can trigger automated tests.",
          [
            "Workflows",
            "Jobs",
            "Actions",
            "Secrets",
            "Automation"
          ]
        ),

        topic(
          "code-review-devops",
          "Pull Requests & Code Review",
          "COLLABORATION",
          "Learn how teams review and merge code changes.",
          "Code review improves software quality before deployment.",
          "A developer opens a pull request and another developer reviews the changes.",
          [
            "Pull Requests",
            "Review",
            "Approval",
            "Merge",
            "Branch Protection"
          ]
        )
      ]
    },

    // =========================================================
    // 6. DOCKER
    // =========================================================
    {
      id: "docker",
      title: "Docker & Containers",
      category: "CONTAINERS",

      main: topic(
        "docker",
        "Docker",
        "CONTAINERS",
        "Learn how applications and their dependencies can be packaged into portable containers.",
        "Containers provide consistent environments across development, testing and production.",
        "A Node.js backend can be packaged into a Docker image and deployed consistently across environments.",
        [
          "Images",
          "Containers",
          "Dockerfile",
          "Volumes",
          "Networks",
          "Registries"
        ]
      ),

      left: [
        topic(
          "docker-images",
          "Docker Images",
          "DOCKER",
          "Learn how Docker images package application code and dependencies.",
          "Images provide a reproducible environment for running applications.",
          "A backend image can contain Node.js, application code and required dependencies.",
          [
            "Images",
            "Layers",
            "Dockerfile",
            "Build",
            "Tags"
          ]
        ),

        topic(
          "docker-containers",
          "Docker Containers",
          "DOCKER",
          "Learn how Docker images are executed as isolated containers.",
          "Containers allow applications to run consistently across machines.",
          "Run a backend application inside a container during development.",
          [
            "Containers",
            "Ports",
            "Volumes",
            "Environment Variables",
            "Logs"
          ]
        )
      ],

      right: [
        topic(
          "docker-compose",
          "Docker Compose",
          "DOCKER",
          "Learn how multiple containers can be defined and run together.",
          "Modern applications often consist of multiple services.",
          "A project can run its frontend, backend and database as separate containers.",
          [
            "Services",
            "Networks",
            "Volumes",
            "docker-compose.yml"
          ]
        ),

        topic(
          "container-registry",
          "Container Registries",
          "DOCKER",
          "Learn how container images are stored and distributed through registries.",
          "Registries allow deployment systems to retrieve application images.",
          "A CI pipeline can push a Docker image to a container registry before deployment.",
          [
            "Images",
            "Repositories",
            "Tags",
            "Push",
            "Pull"
          ]
        )
      ]
    },

    // =========================================================
    // 7. CI/CD
    // =========================================================
    {
      id: "cicd",
      title: "CI/CD",
      category: "AUTOMATION",

      main: topic(
        "cicd",
        "Continuous Integration & Deployment",
        "AUTOMATION",
        "Learn how software can be automatically built, tested and deployed.",
        "CI/CD reduces manual deployment work and allows teams to deliver changes consistently.",
        "Every pull request can automatically run tests before the code is merged.",
        [
          "Continuous Integration",
          "Continuous Delivery",
          "Continuous Deployment",
          "Pipelines",
          "Automation"
        ]
      ),

      left: [
        topic(
          "continuous-integration",
          "Continuous Integration",
          "CI/CD",
          "Learn how code changes can automatically be built and tested.",
          "CI catches integration problems early in the development process.",
          "A pipeline runs unit tests whenever a developer pushes code.",
          [
            "Build",
            "Automated Tests",
            "Pull Requests",
            "Quality Checks"
          ]
        ),

        topic(
          "continuous-delivery",
          "Continuous Delivery",
          "CI/CD",
          "Learn how software is automatically prepared for deployment.",
          "Continuous delivery keeps applications in a deployable state.",
          "A successful build can produce a release artifact ready for deployment.",
          [
            "Build Artifacts",
            "Release",
            "Testing",
            "Deployment Approval"
          ]
        )
      ],

      right: [
        topic(
          "continuous-deployment",
          "Continuous Deployment",
          "CI/CD",
          "Learn how successful changes can automatically reach production.",
          "Automated deployment reduces manual release steps.",
          "A merged pull request can automatically deploy a frontend application.",
          [
            "Automated Deployment",
            "Production",
            "Pipelines",
            "Rollback"
          ]
        ),

        topic(
          "deployment-strategies",
          "Deployment Strategies",
          "CI/CD",
          "Learn different approaches for safely releasing new software versions.",
          "Deployment strategies help reduce production risk.",
          "A canary deployment can release a new version to a small percentage of users first.",
          [
            "Blue-Green",
            "Canary",
            "Rolling Deployment",
            "Rollback"
          ]
        )
      ]
    },

    // =========================================================
    // 8. INFRASTRUCTURE AS CODE
    // =========================================================
    {
      id: "infrastructure-code",
      title: "Infrastructure as Code",
      category: "INFRASTRUCTURE",

      main: topic(
        "infrastructure-code",
        "Infrastructure as Code",
        "INFRASTRUCTURE",
        "Learn how infrastructure can be defined and managed using configuration files and code.",
        "Infrastructure as Code makes environments repeatable and easier to manage.",
        "A cloud environment can be recreated from configuration instead of manually creating resources.",
        [
          "Terraform",
          "Configuration",
          "Resources",
          "State",
          "Automation"
        ]
      ),

      left: [
        topic(
          "terraform",
          "Terraform",
          "INFRASTRUCTURE",
          "Learn how Terraform can define and provision infrastructure using configuration files.",
          "Terraform enables infrastructure to be managed consistently through code.",
          "Define a cloud server and network configuration in Terraform.",
          [
            "Providers",
            "Resources",
            "Variables",
            "Modules",
            "State"
          ]
        ),

        topic(
          "terraform-modules",
          "Infrastructure Modules",
          "INFRASTRUCTURE",
          "Learn how reusable infrastructure configurations can be organized into modules.",
          "Modules reduce duplication in infrastructure configurations.",
          "A standard networking module can be reused across development and production environments.",
          [
            "Modules",
            "Variables",
            "Outputs",
            "Reusable Infrastructure"
          ]
        )
      ],

      right: [
        topic(
          "infrastructure-state",
          "Infrastructure State",
          "INFRASTRUCTURE",
          "Learn how infrastructure tools track the resources they manage.",
          "State allows infrastructure tools to understand the current environment.",
          "Terraform can compare configuration with its recorded infrastructure state before applying changes.",
          [
            "State",
            "State Files",
            "Planning",
            "Changes"
          ]
        ),

        topic(
          "configuration-management",
          "Configuration Management",
          "INFRASTRUCTURE",
          "Learn how system configuration can be managed consistently across servers.",
          "Automated configuration reduces manual server setup.",
          "A configuration tool can install required packages on multiple servers.",
          [
            "Automation",
            "Server Configuration",
            "Ansible",
            "Playbooks"
          ]
        )
      ]
    },

    // =========================================================
    // 9. KUBERNETES
    // =========================================================
    {
      id: "kubernetes",
      title: "Kubernetes",
      category: "ORCHESTRATION",

      main: topic(
        "kubernetes",
        "Kubernetes",
        "ORCHESTRATION",
        "Learn how containerized applications can be deployed, scaled and managed across clusters.",
        "Kubernetes is widely used for managing containerized workloads at scale.",
        "A production application can run multiple backend containers across a Kubernetes cluster.",
        [
          "Clusters",
          "Pods",
          "Deployments",
          "Services",
          "Scaling",
          "ConfigMaps"
        ]
      ),

      left: [
        topic(
          "k8s-pods",
          "Pods",
          "KUBERNETES",
          "Learn the basic execution unit used to run containers in Kubernetes.",
          "Understanding pods is fundamental to Kubernetes application deployment.",
          "A backend container can run inside a Kubernetes pod.",
          [
            "Pods",
            "Containers",
            "Networking",
            "Resources"
          ]
        ),

        topic(
          "k8s-deployments",
          "Deployments",
          "KUBERNETES",
          "Learn how Kubernetes manages replicated application workloads.",
          "Deployments make it easier to update and scale applications.",
          "A deployment can maintain several replicas of an API service.",
          [
            "Deployments",
            "Replicas",
            "Rolling Updates",
            "Rollback"
          ]
        )
      ],

      right: [
        topic(
          "k8s-services",
          "Kubernetes Services",
          "KUBERNETES",
          "Learn how Kubernetes exposes applications to other services or external users.",
          "Services provide stable networking for changing application instances.",
          "A frontend service can communicate with a backend service inside a cluster.",
          [
            "Services",
            "Networking",
            "Ports",
            "Service Discovery"
          ]
        ),

        topic(
          "k8s-config",
          "Kubernetes Configuration",
          "KUBERNETES",
          "Learn how application configuration and sensitive values can be managed in Kubernetes.",
          "Separating configuration from application code makes deployments more flexible.",
          "A database URL can be provided to an application through configuration.",
          [
            "ConfigMaps",
            "Secrets",
            "Environment Variables",
            "Configuration"
          ]
        )
      ]
    },

    // =========================================================
    // 10. MONITORING
    // =========================================================
    {
      id: "monitoring",
      title: "Monitoring & Observability",
      category: "OPERATIONS",

      main: topic(
        "monitoring",
        "Monitoring & Observability",
        "OPERATIONS",
        "Learn how to observe application health, performance and infrastructure behaviour.",
        "Monitoring helps teams detect failures and understand production systems.",
        "A team can monitor API response times and receive an alert when latency becomes unusually high.",
        [
          "Metrics",
          "Logs",
          "Traces",
          "Alerts",
          "Dashboards",
          "Observability"
        ]
      ),

      left: [
        topic(
          "metrics",
          "Metrics",
          "MONITORING",
          "Learn how numerical measurements can be used to monitor system health.",
          "Metrics help identify performance and capacity problems.",
          "CPU usage and API response time can be monitored over time.",
          [
            "CPU",
            "Memory",
            "Latency",
            "Request Rate",
            "Error Rate"
          ]
        ),

        topic(
          "logging",
          "Logging",
          "MONITORING",
          "Learn how application and infrastructure events are recorded for analysis.",
          "Logs are essential for troubleshooting production issues.",
          "Backend logs can show why a particular API request failed.",
          [
            "Application Logs",
            "System Logs",
            "Log Levels",
            "Centralized Logging"
          ]
        )
      ],

      right: [
        topic(
          "distributed-tracing",
          "Distributed Tracing",
          "OBSERVABILITY",
          "Learn how requests can be traced across multiple services.",
          "Tracing helps identify where latency or failures occur in distributed systems.",
          "A request can be traced from the API gateway through several backend services.",
          [
            "Traces",
            "Spans",
            "Service Dependencies",
            "Latency"
          ]
        ),

        topic(
          "alerts",
          "Alerts & Dashboards",
          "MONITORING",
          "Learn how monitoring systems notify teams about important events.",
          "Alerts allow teams to respond quickly when systems experience problems.",
          "An alert can notify engineers when an API error rate exceeds a defined threshold.",
          [
            "Alerts",
            "Thresholds",
            "Dashboards",
            "Notifications",
            "Incidents"
          ]
        )
      ]
    },

    // =========================================================
    // 11. CLOUD SECURITY
    // =========================================================
    {
      id: "devops-security",
      title: "Cloud & DevOps Security",
      category: "SECURITY",

      main: topic(
        "devops-security",
        "Cloud Security",
        "SECURITY",
        "Learn how cloud infrastructure, deployment pipelines and application secrets can be protected.",
        "DevOps environments contain infrastructure credentials and production resources that must be secured.",
        "A CI/CD pipeline should access cloud credentials through secure secret management rather than source code.",
        [
          "IAM",
          "Secrets",
          "Least Privilege",
          "Network Security",
          "Pipeline Security"
        ]
      ),

      left: [
        topic(
          "iam",
          "Identity & Access Management",
          "CLOUD SECURITY",
          "Learn how cloud users and services receive controlled permissions.",
          "Least-privilege access reduces the impact of compromised credentials.",
          "A deployment pipeline can receive only the permissions required to deploy a specific application.",
          [
            "Users",
            "Roles",
            "Policies",
            "Permissions",
            "Least Privilege"
          ]
        ),

        topic(
          "secrets-management",
          "Secrets Management",
          "CLOUD SECURITY",
          "Learn how passwords, API keys and credentials should be stored and accessed securely.",
          "Exposed secrets can compromise entire environments.",
          "Database credentials can be stored in a secrets manager instead of a Git repository.",
          [
            "Secrets",
            "API Keys",
            "Credentials",
            "Secret Managers",
            "Rotation"
          ]
        )
      ],

      right: [
        topic(
          "pipeline-security",
          "CI/CD Security",
          "DEVSECOPS",
          "Learn how security checks can be integrated into development and deployment pipelines.",
          "Security should be considered throughout the software delivery process.",
          "A pipeline can scan dependencies for known vulnerabilities before deployment.",
          [
            "Dependency Scanning",
            "Secret Scanning",
            "Security Tests",
            "Code Scanning"
          ]
        ),

        topic(
          "container-security",
          "Container Security",
          "DEVSECOPS",
          "Learn how container images and runtime environments can be secured.",
          "Vulnerable container images can introduce security risks into production systems.",
          "A CI pipeline can scan Docker images before pushing them to a registry.",
          [
            "Image Scanning",
            "Minimal Images",
            "Runtime Security",
            "Vulnerabilities"
          ]
        )
      ]
    },

    // =========================================================
    // 12. REAL-WORLD PROJECTS
    // =========================================================
    {
      id: "cloud-projects",
      title: "Build Real Cloud & DevOps Projects",
      category: "BUILD",

      main: topic(
        "cloud-projects",
        "Cloud & DevOps Projects",
        "BUILD",
        "Apply cloud and DevOps concepts by deploying, automating and monitoring real applications.",
        "Projects demonstrate practical infrastructure and deployment skills.",
        "Deploy a full-stack application with Docker, CI/CD, cloud hosting and monitoring.",
        [
          "Cloud",
          "Docker",
          "CI/CD",
          "Monitoring",
          "Security",
          "Deployment"
        ]
      ),

      left: [
        topic(
          "docker-deployment-project",
          "Dockerized Application",
          "PROJECT",
          "Containerize a complete application and run its services using Docker.",
          "This project demonstrates containerization and environment consistency.",
          "Run a React frontend, Node.js backend and database using containers.",
          [
            "Docker",
            "Docker Compose",
            "Containers",
            "Networking",
            "Volumes"
          ]
        ),

        topic(
          "cicd-project",
          "CI/CD Pipeline Project",
          "PROJECT",
          "Build an automated pipeline that tests and deploys an application.",
          "This demonstrates real-world software delivery automation.",
          "Push code to GitHub and automatically run tests before deploying the application.",
          [
            "GitHub Actions",
            "Testing",
            "Build",
            "Deployment",
            "Secrets"
          ]
        )
      ],

      right: [
        topic(
          "cloud-monitoring-project",
          "Cloud Monitoring Project",
          "PROJECT",
          "Deploy an application and build monitoring for its infrastructure and services.",
          "Monitoring is an essential part of production operations.",
          "Track application errors, response time and server resource usage.",
          [
            "Metrics",
            "Logs",
            "Alerts",
            "Dashboard",
            "Monitoring"
          ]
        ),

        topic(
          "devops-capstone",
          "DevOps Capstone",
          "PROJECT",
          "Build and deploy a production-style application using cloud infrastructure, containers, CI/CD and monitoring.",
          "A capstone demonstrates the complete DevOps workflow from source code to production.",
          "Deploy EngineerOS using containers, automated deployment, environment configuration and monitoring.",
          [
            "Cloud",
            "Docker",
            "CI/CD",
            "Security",
            "Monitoring",
            "Production"
          ]
        )
      ]
    }
  ]
},
};