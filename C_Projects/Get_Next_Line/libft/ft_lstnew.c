/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstnew.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/25 01:11:33 by blaine            #+#    #+#             */
/*   Updated: 2019/11/05 23:55:13 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "./includes/libft.h"

t_list	*ft_lstnew(void const *content, size_t content_size)
{
	t_list	*block;

	if (!(block = (t_list*)malloc(sizeof(t_list))))
		return (NULL);
	if (!content)
	{
		block->content = NULL;
		block->content_size = 0;
		block->next = NULL;
	}
	else
	{
		if ((block->content = ft_strndup((char*)content, content_size)) == NULL)
			return (NULL);
		block->content_size = content_size;
		block->next = NULL;
	}
	return (block);
}
