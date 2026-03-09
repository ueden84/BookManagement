package com.ueden.book.book;

import com.ueden.book.common.BaseEntity;
import com.ueden.book.feedback.Feedback;
import com.ueden.book.history.BookTransactionHistory;
import com.ueden.book.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Book extends BaseEntity {

    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String bookCover;
    private boolean archived;
    private boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id") // this creates the column owner_id in Book table
    private User owner;

    @OneToMany(mappedBy = "book") // table Feedback will get book_id column, see Feedback entity
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "book")
    private List<BookTransactionHistory> histories;
}
