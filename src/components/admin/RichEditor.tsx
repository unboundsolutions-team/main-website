import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus, Image as ImageIcon, Link2,
  Undo, Redo, Code2, Pilcrow,
} from "lucide-react";

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const RichEditor = ({ value, onChange }: RichEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-4 max-w-full h-auto" } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
      Placeholder.configure({ placeholder: "Write your article here…" }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base max-w-none dark:prose-invert focus:outline-none min-h-[400px] px-4 py-3",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const uploadImage = useCallback(
    async (file: File) => {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("blog-images").upload(path, file, {
        upsert: false,
        contentType: file.type,
      });
      if (error) {
        toast.error(error.message);
        return null;
      }
      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      return data.publicUrl;
    },
    [],
  );

  const handleImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;
    const url = await uploadImage(file);
    if (url) editor.chain().focus().setImage({ src: url, alt: file.name }).run();
  };

  const setLink = () => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href;
    const url = window.prompt("URL", previous || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const insertHTML = () => {
    if (!editor) return;
    const html = window.prompt("Paste raw HTML:");
    if (html) editor.chain().focus().insertContent(html).run();
  };

  if (!editor) return null;

  const Btn = ({
    onClick, active, label, children,
  }: { onClick: () => void; active?: boolean; label: string; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`p-2 rounded-md transition-colors ${
        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-border rounded-xl bg-background overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/40">
        <Btn label="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold className="w-4 h-4" /></Btn>
        <Btn label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic className="w-4 h-4" /></Btn>
        <Btn label="Strike" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}><Strikethrough className="w-4 h-4" /></Btn>
        <Btn label="Inline code" onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")}><Code className="w-4 h-4" /></Btn>
        <span className="w-px h-6 bg-border mx-1" />
        <Btn label="H1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}><Heading1 className="w-4 h-4" /></Btn>
        <Btn label="H2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 className="w-4 h-4" /></Btn>
        <Btn label="H3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 className="w-4 h-4" /></Btn>
        <Btn label="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")}><Pilcrow className="w-4 h-4" /></Btn>
        <span className="w-px h-6 bg-border mx-1" />
        <Btn label="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List className="w-4 h-4" /></Btn>
        <Btn label="Ordered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered className="w-4 h-4" /></Btn>
        <Btn label="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote className="w-4 h-4" /></Btn>
        <Btn label="Code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}><Code2 className="w-4 h-4" /></Btn>
        <Btn label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="w-4 h-4" /></Btn>
        <span className="w-px h-6 bg-border mx-1" />
        <Btn label="Link" onClick={setLink} active={editor.isActive("link")}><Link2 className="w-4 h-4" /></Btn>
        <Btn label="Image" onClick={() => fileInputRef.current?.click()}><ImageIcon className="w-4 h-4" /></Btn>
        <Button type="button" size="sm" variant="ghost" onClick={insertHTML} className="h-8 text-xs">HTML</Button>
        <span className="ml-auto flex gap-1">
          <Btn label="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo className="w-4 h-4" /></Btn>
          <Btn label="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo className="w-4 h-4" /></Btn>
        </span>
      </div>
      <EditorContent editor={editor} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImagePick}
      />
    </div>
  );
};

export default RichEditor;
