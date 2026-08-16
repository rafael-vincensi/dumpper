CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES tb_post(id),
    CONSTRAINT unique_user_post UNIQUE (user_id, post_id)
);