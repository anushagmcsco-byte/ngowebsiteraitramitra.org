import { NextRequest, NextResponse } from "next/server";
import { getBlogsFromServer, saveBlogsToServer } from "@/lib/blogs-server";
import { BlogPost } from "@/lib/blogs";

export async function GET(req: NextRequest) {
  try {
    const blogs = getBlogsFromServer();
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const newBlog: BlogPost = await req.json();
    if (!newBlog || !newBlog.id || !newBlog.title || !newBlog.content) {
      return NextResponse.json(
        { error: "Insufficient payload fields provided to compile a blog record." },
        { status: 400 }
      );
    }

    const currentBlogs = getBlogsFromServer();
    // Prepend so that the latest news is on top
    const updated = [newBlog, ...currentBlogs];
    saveBlogsToServer(updated);

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error while posting blog item" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedBlog: BlogPost = await req.json();
    if (!updatedBlog || !updatedBlog.id || !updatedBlog.title || !updatedBlog.content) {
      return NextResponse.json(
        { error: "Insufficient payload fields provided to edit the blog record." },
        { status: 400 }
      );
    }

    const currentBlogs = getBlogsFromServer();
    const updated = currentBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
    saveBlogsToServer(updated);

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error while updating blog item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "An explicit blog 'id' parameter is required for deletion." },
        { status: 400 }
      );
    }

    const currentBlogs = getBlogsFromServer();
    const filtered = currentBlogs.filter((b) => b.id !== id);
    saveBlogsToServer(filtered);

    return NextResponse.json({ success: true, message: "Blog record deleted successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error while executing deletion." },
      { status: 500 }
    );
  }
}
