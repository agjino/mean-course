import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: [ './post-create.component.css' ]
})
export class PostCreateComponent {
    enteredTitle: string;
    enteredContent: string;

    constructor(private postsService: PostsService) { }

    onAddPost(form: NgForm) {
      if (form.invalid) return;
      this.postsService.addPost(form.value.title, form.value.content);
      form.resetForm();
    }

}