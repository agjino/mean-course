import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: [ './post-list.component.css' ]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(private postService: PostsService) {}

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe( posts => this.posts = posts );
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}