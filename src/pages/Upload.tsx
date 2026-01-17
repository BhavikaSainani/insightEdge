import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, FileText, CheckCircle2, Loader2, Sparkles, Brain, Target, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadResume } from "@/services/careerService";
import { toast } from "sonner";

const steps = [
  { icon: FileText, label: "Parsing Resume", description: "Reading your experience" },
  { icon: Brain, label: "Understanding Skills", description: "Mapping your abilities" },
  { icon: Target, label: "Matching Roles", description: "Finding your fit" },
];

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf"))) {
      processFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
    // Reset input so the same file can be selected again if needed
    e.target.value = '';
  };

  const processFile = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setError(null);
    setCurrentStep(0);

    try {
      // Step 1: Parsing Resume
      const response = await uploadResume(uploadedFile);
      setCurrentStep(1);

      // Step 2: Understanding Skills (brief delay for UX)
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCurrentStep(2);

      // Step 3: Matching Roles
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsComplete(true);
      toast.success(`Found ${response.skills_found} skills and ${response.projects_found} projects!`);

      // Navigate to career match page
      setTimeout(() => navigate("/career-match"), 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process resume. Make sure the Career API is running.";
      setError(errorMessage);
      setCurrentStep(-1);
      setFile(null);
      toast.error(errorMessage);
    }
  };


  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Analysis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upload Your Resume
          </h1>
          <p className="text-muted-foreground">
            We analyze skills, not judge resumes 🌱
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`card-urban p-12 text-center border-2 border-dashed transition-all duration-300 ${isDragging
                ? "border-primary bg-secondary/50 scale-[1.02]"
                : "border-border hover:border-primary/50"
                }`}
            >
              <motion.div
                animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center"
              >
                <UploadIcon className="w-10 h-10 text-primary" />
              </motion.div>

              <h3 className="text-xl font-semibold text-foreground mb-2">
                Drag & drop your resume here
              </h3>
              <p className="text-muted-foreground mb-6">
                or click to browse files
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <Button
                type="button"
                className="btn-forest"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
                Supports PDF (Max 5MB)
              </p>
            </div>
          ) : (
            <div className="card-urban p-8">
              <div className="flex items-center gap-4 mb-8 p-4 rounded-xl bg-secondary">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-10 h-10 rounded-full bg-leaf/20 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-6 h-6 text-leaf" />
                  </motion.div>
                )}
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === index;
                  const isCompleted = currentStep > index;

                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isActive
                        ? "bg-secondary"
                        : isCompleted
                          ? "bg-leaf/10"
                          : "bg-muted/50"
                        }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isActive
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                            ? "bg-leaf text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {isActive ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                  >
                    <p className="text-lg font-medium text-leaf mb-2">
                      ✨ Analysis Complete!
                    </p>
                    <p className="text-muted-foreground">
                      Redirecting to your career matches...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;
